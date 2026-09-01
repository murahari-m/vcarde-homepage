<?php
/**
 * Paste this block near the TOP of routes/web.php
 * (before InfyVCards / Front routes).
 *
 * Laravel's own /contact collides with the new homepage.
 * This serves the SPA file instead of the Laravel 404.
 */
use Illuminate\Support\Facades\Route;

Route::get("/contact", function () {
    $file = public_path("spa-home/index.html");
    abort_unless(is_file($file), 404);
    return response()->file($file);
})->name("vcarde.contact");

Route::get("/enquire", function () {
    $file = public_path("spa-home/index.html");
    abort_unless(is_file($file), 404);
    return response()->file($file);
});
