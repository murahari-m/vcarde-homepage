<?php
/**
 * Location lookup for "NFC card near you"
 *
 * Copy this file to the VPS public folder as geo.php
 *
 * Keys — paste only on the VPS, never in GitHub:
 * 1. Google Geocoding API key (for GPS / precise suburb)
 *    https://console.cloud.google.com/google/maps-apis/credentials
 *    Enable "Geocoding API". Restrict the key to this server IP.
 * 2. MaxMind GeoIP2 account ID + license (for IP city)
 *    https://www.maxmind.com/en/accounts/current/license-key
 *    GeoIP2 City web service. Cloudflare already uses MaxMind if
 *    Dashboard → Network → IP Geolocation is ON (no MaxMind key needed).
 */
$GOOGLE_GEOCODING_KEY = "";
$MAXMIND_ACCOUNT_ID = "";
$MAXMIND_LICENSE_KEY = "";

header("Content-Type: application/json; charset=utf-8");
header("X-Content-Type-Options: nosniff");
header("Cache-Control: no-store");

function geo_out(array $data): void {
  echo json_encode($data);
  exit;
}

function client_ip(): string {
  foreach (["HTTP_CF_CONNECTING_IP", "HTTP_X_FORWARDED_FOR", "REMOTE_ADDR"] as $h) {
    if (!empty($_SERVER[$h])) {
      return trim(explode(",", (string) $_SERVER[$h])[0]);
    }
  }
  return "";
}

function http_get(string $url, array $headers = [], ?string $basic = null): ?array {
  $headerLines = array_merge(["Accept: application/json"], $headers);
  if ($basic) {
    $headerLines[] = "Authorization: Basic " . $basic;
  }
  $ctx = stream_context_create([
    "http" => [
      "method" => "GET",
      "timeout" => 4,
      "header" => implode("\r\n", $headerLines) . "\r\n",
    ],
  ]);
  $raw = @file_get_contents($url, false, $ctx);
  if ($raw === false) return null;
  $json = json_decode($raw, true);
  return is_array($json) ? $json : null;
}

$body = json_decode(file_get_contents("php://input") ?: "", true);
if (!is_array($body)) $body = [];
$lat = $body["lat"] ?? $_GET["lat"] ?? null;
$lng = $body["lng"] ?? $_GET["lng"] ?? null;

if ($lat !== null && $lng !== null && is_numeric($lat) && is_numeric($lng)) {
  $lat = (float) $lat;
  $lng = (float) $lng;
  if ($lat < -90 || $lat > 90 || $lng < -180 || $lng > 180) {
    geo_out(["ok" => false, "error" => "Bad coordinates"]);
  }

  if ($GOOGLE_GEOCODING_KEY !== "") {
    $q = http_build_query([
      "latlng" => $lat . "," . $lng,
      "key" => $GOOGLE_GEOCODING_KEY,
      "language" => "en",
    ]);
    $data = http_get("https://maps.googleapis.com/maps/api/geocode/json?" . $q);
    $comp = $data["results"][0]["address_components"] ?? [];
    $pick = function (array $types) use ($comp): string {
      foreach ($comp as $c) {
        if (count(array_intersect($c["types"] ?? [], $types))) {
          return (string) ($c["long_name"] ?? "");
        }
      }
      return "";
    };
    $sub = $pick(["sublocality_level_1", "sublocality", "neighborhood"]);
    $city = $pick(["locality", "administrative_area_level_2"]);
    $region = $pick(["administrative_area_level_1"]);
    geo_out([
      "ok" => true,
      "source" => "google",
      "sublocality" => $sub,
      "city" => $city,
      "region" => $region,
    ]);
  }

  $nom = http_get(
    "https://nominatim.openstreetmap.org/reverse?lat={$lat}&lon={$lng}&format=json",
    ["User-Agent: VCARDe-NFC/1.0 (https://vcarde.com)"]
  );
  $addr = is_array($nom["address"] ?? null) ? $nom["address"] : [];
  geo_out([
    "ok" => true,
    "source" => "nominatim",
    "sublocality" => $addr["suburb"] ?? $addr["neighbourhood"] ?? $addr["village"] ?? "",
    "city" => $addr["city"] ?? $addr["town"] ?? $addr["county"] ?? "",
    "region" => $addr["state"] ?? "",
  ]);
}

$cfCity = $_SERVER["HTTP_CF_IPCITY"] ?? "";
$cfRegion = $_SERVER["HTTP_CF_REGION"] ?? "";
$cfCountry = $_SERVER["HTTP_CF_IPCOUNTRY"] ?? "";
if ($cfCity !== "") {
  geo_out([
    "ok" => true,
    "source" => "cloudflare-maxmind",
    "city" => $cfCity,
    "region" => $cfRegion,
    "country" => $cfCountry,
  ]);
}

if ($MAXMIND_ACCOUNT_ID !== "" && $MAXMIND_LICENSE_KEY !== "") {
  $ip = client_ip();
  if ($ip !== "") {
    $auth = base64_encode($MAXMIND_ACCOUNT_ID . ":" . $MAXMIND_LICENSE_KEY);
    $mm = http_get("https://geoip.maxmind.com/geoip/v2.1/city/" . rawurlencode($ip), [], $auth);
    $city = $mm["city"]["names"]["en"] ?? "";
    $sub = $mm["subdivisions"][0]["names"]["en"] ?? "";
    if ($city !== "") {
      geo_out([
        "ok" => true,
        "source" => "maxmind",
        "city" => $city,
        "sublocality" => "",
        "region" => $sub,
        "country" => $mm["country"]["iso_code"] ?? "",
      ]);
    }
  }
}

geo_out(["ok" => false, "source" => "none"]);
