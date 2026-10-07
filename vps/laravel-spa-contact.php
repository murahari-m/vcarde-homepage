<?php
/**
 * Paste at the TOP of routes/web.php, before InfyVCards routes.
 * Do not use a catch-all — vCard URLs like /yourname must stay on Laravel.
 *
 * These marketing pages live in public/spa-home/index.html.
 * Without this, a refresh on /nfc-business-cards is Laravel's 404.
 */
use Illuminate\Support\Facades\Route;

$vcardeSpa = function () {
    $file = public_path("spa-home/index.html");
    abort_unless(is_file($file), 404);
    return response()->file($file);
};

$pages = "contact|about|faq|press|templates|nfc-business-cards|nfc-business-card-guide|nfc-cards|nfc-google-reviews|nfc-vs-qr|qr-code-generator|pvc-nfc-business-card|metal-nfc-business-card|nfc-card-near";

Route::get("/{page}", $vcardeSpa)->where("page", $pages);
Route::get("/nfc-card-near/{area}", $vcardeSpa)->where("area", "[a-z0-9\-]+");
