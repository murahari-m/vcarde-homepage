<?php
/**
 * Contact form — copy to VPS public/ as contact.php
 *
 * Uses the Laravel .env already on the VPS (../.env). Do not add a Brevo
 * API key unless you want to. SMTP is enough:
 *
 *   MAIL_MAILER=smtp
 *   MAIL_HOST=smtp-relay.brevo.com
 *   MAIL_PORT=587
 *   MAIL_USERNAME=...
 *   MAIL_PASSWORD=...
 *   MAIL_ENCRYPTION=tls
 *   MAIL_FROM_ADDRESS=noreply@...
 *   MAIL_FROM_NAME=VCARDe
 *   MAIL_TO_ADDRESS=cc@vcarde.com
 *   NOCAPTCHA_SECRET=...   or  RECAPTCHA_SECRET_KEY=...
 *
 * Optional override: set BREVO_API_KEY and mail will use the HTTP API instead.
 */
$BREVO_API_KEY = "";
$RECAPTCHA_SECRET_KEY = "";
$MAIL_HOST = "";
$MAIL_PORT = "";
$MAIL_USERNAME = "";
$MAIL_PASSWORD = "";
$MAIL_ENCRYPTION = "";
$MAIL_FROM_ADDRESS = "";
$MAIL_FROM_NAME = "";
$MAIL_TO_ADDRESS = "";

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");
header("Cache-Control: no-store");

if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "POST only"]);
  exit;
}

function env_file(string $path): array {
  if (!is_readable($path)) return [];
  $out = [];
  foreach (file($path, FILE_IGNORE_NEW_LINES) ?: [] as $line) {
    $line = trim($line);
    if ($line === "" || str_starts_with($line, "#")) continue;
    $eq = strpos($line, "=");
    if ($eq === false) continue;
    $k = trim(substr($line, 0, $eq));
    $v = trim(substr($line, $eq + 1));
    $v = trim($v, "\"'");
    if ($k !== "") $out[$k] = $v;
  }
  return $out;
}

function pick(array $bag, array $keys, string $fallback = ""): string {
  foreach ($keys as $k) {
    $v = $bag[$k] ?? "";
    if (is_string($v) && $v !== "") return $v;
  }
  return $fallback;
}

function smtp_expect($fp, $want): string {
  $resp = "";
  while (($line = fgets($fp, 1024)) !== false) {
    $resp .= $line;
    if (isset($line[3]) && $line[3] === " ") break;
  }
  $code = (int) substr($resp, 0, 3);
  $ok = is_array($want) ? in_array($code, $want, true) : $code === $want;
  if (!$ok) throw new RuntimeException("SMTP $code");
  return $resp;
}

function smtp_send(array $cfg, string $to, string $from, string $fromName, string $reply, string $replyName, string $subject, string $html): void {
  $host = $cfg["host"];
  $port = (int) $cfg["port"];
  $enc = strtolower($cfg["encryption"]);
  $remote = ($enc === "ssl" || $port === 465) ? "ssl://{$host}:{$port}" : "tcp://{$host}:{$port}";
  $fp = @stream_socket_client($remote, $errno, $errstr, 12, STREAM_CLIENT_CONNECT);
  if (!$fp) throw new RuntimeException("SMTP connect");
  stream_set_timeout($fp, 12);
  smtp_expect($fp, 220);
  $ehlo = "EHLO vcarde.com";
  fwrite($fp, $ehlo . "\r\n");
  smtp_expect($fp, 250);
  if ($enc === "tls" || $port === 587) {
    fwrite($fp, "STARTTLS\r\n");
    smtp_expect($fp, 220);
    if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      throw new RuntimeException("SMTP TLS");
    }
    fwrite($fp, $ehlo . "\r\n");
    smtp_expect($fp, 250);
  }
  if ($cfg["username"] !== "") {
    fwrite($fp, "AUTH LOGIN\r\n");
    smtp_expect($fp, 334);
    fwrite($fp, base64_encode($cfg["username"]) . "\r\n");
    smtp_expect($fp, 334);
    fwrite($fp, base64_encode($cfg["password"]) . "\r\n");
    smtp_expect($fp, 235);
  }
  fwrite($fp, "MAIL FROM:<{$from}>\r\n");
  smtp_expect($fp, 250);
  fwrite($fp, "RCPT TO:<{$to}>\r\n");
  smtp_expect($fp, [250, 251]);
  fwrite($fp, "DATA\r\n");
  smtp_expect($fp, 354);
  $headers = [
    "Date: " . date("r"),
    "From: " . sprintf('"%s" <%s>', addcslashes($fromName, '"'), $from),
    "To: " . $to,
    "Reply-To: " . sprintf('"%s" <%s>', addcslashes($replyName, '"'), $reply),
    "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
  ];
  $body = implode("\r\n", $headers) . "\r\n\r\n" . $html . "\r\n.";
  fwrite($fp, $body . "\r\n");
  smtp_expect($fp, 250);
  fwrite($fp, "QUIT\r\n");
  fclose($fp);
}

$fileEnv = [];
foreach ([
  __DIR__ . "/.env",
  __DIR__ . "/../.env",
  __DIR__ . "/../../.env",
] as $p) {
  if (is_readable($p)) {
    $fileEnv = env_file($p);
    break;
  }
}

$sys = getenv() ?: [];
$bag = array_merge($fileEnv, is_array($sys) ? $sys : []);

if ($BREVO_API_KEY === "") {
  $BREVO_API_KEY = pick($bag, ["BREVO_API_KEY", "BREVO_KEY"]);
}
if ($RECAPTCHA_SECRET_KEY === "") {
  $RECAPTCHA_SECRET_KEY = pick($bag, [
    "RECAPTCHA_SECRET_KEY",
    "NOCAPTCHA_SECRET",
    "GOOGLE_RECAPTCHA_SECRET",
    "GOOGLE_RECAPTCHA_SECRET_KEY",
    "RECAPTCHA_SECRET",
  ]);
}
if ($MAIL_HOST === "") $MAIL_HOST = pick($bag, ["MAIL_HOST"]);
if ($MAIL_PORT === "") $MAIL_PORT = pick($bag, ["MAIL_PORT"], "587");
if ($MAIL_USERNAME === "") $MAIL_USERNAME = pick($bag, ["MAIL_USERNAME"]);
if ($MAIL_PASSWORD === "") $MAIL_PASSWORD = pick($bag, ["MAIL_PASSWORD"]);
if ($MAIL_ENCRYPTION === "") $MAIL_ENCRYPTION = pick($bag, ["MAIL_ENCRYPTION", "MAIL_SCHEME"], "tls");
if ($MAIL_FROM_ADDRESS === "") {
  $MAIL_FROM_ADDRESS = pick($bag, ["MAIL_FROM_ADDRESS"], "noreply@vcarde.com");
}
if ($MAIL_FROM_NAME === "") {
  $MAIL_FROM_NAME = pick($bag, ["MAIL_FROM_NAME"], "VCARDe NFC Business Cards");
}
if ($MAIL_TO_ADDRESS === "") {
  $MAIL_TO_ADDRESS = pick($bag, ["MAIL_TO_ADDRESS", "CONTACT_EMAIL", "MAIL_TO"], "cc@vcarde.com");
}

$raw = file_get_contents("php://input") ?: "";
$json = json_decode($raw, true);
if (!is_array($json)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Bad JSON"]);
  exit;
}

$name = trim((string) ($json["name"] ?? ""));
$email = trim((string) ($json["email"] ?? ""));
$phone = trim((string) ($json["phone"] ?? ""));
$city = trim((string) ($json["city"] ?? ""));
$message = trim((string) ($json["message"] ?? ""));
$token = trim((string) ($json["token"] ?? ""));

if (strlen($name) < 2 || strlen($name) > 80) {
  http_response_code(422);
  echo json_encode(["ok" => false, "error" => "Enter your name"]);
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(["ok" => false, "error" => "Enter a valid email"]);
  exit;
}
$phoneDigits = preg_replace("/\D/", "", $phone) ?? "";
if (!preg_match("/^\+?[0-9]+$/", $phone) || strlen($phoneDigits) < 10) {
  http_response_code(422);
  echo json_encode(["ok" => false, "error" => "Enter a valid phone with at least 10 digits"]);
  exit;
}
if (strlen($city) < 2 || strlen($message) < 5) {
  http_response_code(422);
  echo json_encode(["ok" => false, "error" => "Fill all fields"]);
  exit;
}
if ($token === "" || $RECAPTCHA_SECRET_KEY === "") {
  http_response_code(501);
  echo json_encode(["ok" => false, "error" => "reCAPTCHA is not configured in .env"]);
  exit;
}

$ch = curl_init("https://www.google.com/recaptcha/api/siteverify");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => http_build_query([
    "secret" => $RECAPTCHA_SECRET_KEY,
    "response" => $token,
  ]),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 8,
]);
$verifyBody = curl_exec($ch);
curl_close($ch);
$verify = json_decode((string) $verifyBody, true);
$captchaOk = is_array($verify)
  && !empty($verify["success"])
  && (float) ($verify["score"] ?? 0) >= 0.5
  && (($verify["action"] ?? "") === "contact");
if (!$captchaOk) {
  http_response_code(403);
  echo json_encode(["ok" => false, "error" => "Verification failed"]);
  exit;
}

$safe = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
$html = "<p><strong>Name:</strong> " . $safe($name) . "</p>"
  . "<p><strong>Email:</strong> " . $safe($email) . "</p>"
  . "<p><strong>Phone:</strong> " . $safe($phone) . "</p>"
  . "<p><strong>City:</strong> " . $safe($city) . "</p>"
  . "<p><strong>Message:</strong><br>" . nl2br($safe($message)) . "</p>";
$subject = "Website enquiry from " . $name;

$sent = false;
if ($BREVO_API_KEY !== "") {
  $payload = [
    "sender" => ["name" => $MAIL_FROM_NAME, "email" => $MAIL_FROM_ADDRESS],
    "to" => [["email" => $MAIL_TO_ADDRESS, "name" => "VCARDe"]],
    "replyTo" => ["email" => $email, "name" => $name],
    "subject" => $subject,
    "htmlContent" => $html,
  ];
  $ch = curl_init("https://api.brevo.com/v3/smtp/email");
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      "accept: application/json",
      "content-type: application/json",
      "api-key: " . $BREVO_API_KEY,
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 12,
  ]);
  curl_exec($ch);
  $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  $sent = $code >= 200 && $code < 300;
}

if (!$sent && $MAIL_HOST !== "") {
  try {
    smtp_send(
      [
        "host" => $MAIL_HOST,
        "port" => $MAIL_PORT !== "" ? $MAIL_PORT : "587",
        "username" => $MAIL_USERNAME,
        "password" => $MAIL_PASSWORD,
        "encryption" => $MAIL_ENCRYPTION !== "" ? $MAIL_ENCRYPTION : "tls",
      ],
      $MAIL_TO_ADDRESS,
      $MAIL_FROM_ADDRESS,
      $MAIL_FROM_NAME,
      $email,
      $name,
      $subject,
      $html
    );
    $sent = true;
  } catch (Throwable $e) {
    $sent = false;
  }
}

if (!$sent) {
  http_response_code(502);
  echo json_encode(["ok" => false, "error" => "Could not send mail"]);
  exit;
}

echo json_encode(["ok" => true]);
