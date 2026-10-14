<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
        'api_key' => config('services.tmdb.key'),
    ])->json();

    return Inertia::render('welcome', [
        'movies' => $response['results'] ?? [],
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
