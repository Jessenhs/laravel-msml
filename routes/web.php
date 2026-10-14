<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $response = Http::get('https://api.themoviedb.org/3/movie/popular?api_key=' . env('TMDB_API_KEY'))->json();

    $movies = $response['results'] ?? [];

    return Inertia::render('welcome', ['movies' => $movies]);
})->name('home');

Route::get('/search', function () {
    $query = request()->input('q', '');
    $response = Http::get('https://api.themoviedb.org/3/search/movie?api_key=' . env('TMDB_API_KEY') . '&query=' . urlencode($query))->json();

    return Inertia::render('welcome', ['movies' => $response['results'] ?? [], 'query' => $query]);
})->name('search');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
