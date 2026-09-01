<?php
/**
 * reCAPTCHA v3 verify — copy this file into your Laravel public/ folder
 * as recaptcha-verify.php so the homepage can POST to /recaptcha-verify.php
 *
 * Paste the Secret key between the quotes on the next line.
 */
$RECAPTCHA_SECRET_KEY = "";

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "POST only"]);
  exit;
}

if ($RECAPTCHA_SECRET_KEY === "") {
  http_response_code(501);
  echo json_encode(["ok" => false, "error" => "Add the secret key in recaptcha-verify.php"]);
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
