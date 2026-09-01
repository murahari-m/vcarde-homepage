<?php
/**
 * reCAPTCHA v3 verify — copy to VPS public/ as recaptcha-verify.php
 *
 * Secret is read from Laravel .env (../.env):
 *   RECAPTCHA_SECRET_KEY  or  NOCAPTCHA_SECRET
 * Leave the quotes below empty unless you want to override .env.
 */
$RECAPTCHA_SECRET_KEY = "";

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "POST only"]);
  exit;
}

function env_file_rv(string $path): array {
  if (!is_readable($path)) return [];
  $out = [];
  foreach (file($path, FILE_IGNORE_NEW_LINES) ?: [] as $line) {
    $line = trim($line);
    if ($line === "" || str_starts_with($line, "#")) continue;
    $eq = strpos($line, "=");
    if ($eq === false) continue;
    $k = trim(substr($line, 0, $eq));
    $v = trim(substr($line, $eq + 1), " \t\"'");
    if ($k !== "") $out[$k] = $v;
  }
  return $out;
}

if ($RECAPTCHA_SECRET_KEY === "") {
  $fileEnv = [];
  foreach ([__DIR__ . "/.env", __DIR__ . "/../.env", __DIR__ . "/../../.env"] as $p) {
    if (is_readable($p)) {
      $fileEnv = env_file_rv($p);
      break;
    }
  }
  foreach (["RECAPTCHA_SECRET_KEY", "NOCAPTCHA_SECRET", "GOOGLE_RECAPTCHA_SECRET", "RECAPTCHA_SECRET"] as $k) {
    if (!empty($fileEnv[$k])) {
      $RECAPTCHA_SECRET_KEY = $fileEnv[$k];
      break;
    }
  }
}

if ($RECAPTCHA_SECRET_KEY === "") {
  http_response_code(501);
  echo json_encode(["ok" => false, "error" => "Add NOCAPTCHA_SECRET or RECAPTCHA_SECRET_KEY in .env"]);
  exit;
}

$raw = file_get_contents("php://input");
$json = json_decode($raw, true);
$token = is_array($json) && isset($json["token"]) ? (string) $json["token"] : "";

if ($token === "") {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Missing token"]);
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
$body = curl_exec($ch);
curl_close($ch);

$data = json_decode((string) $body, true);
$ok = is_array($data)
  && !empty($data["success"])
  && (float) ($data["score"] ?? 0) >= 0.5
  && (($data["action"] ?? "") === "email");

echo json_encode(["ok" => $ok]);
