<?php

use App\Http\Controllers\Api\MovieController;
use App\Http\Middleware\ApiKeyOrFrontend;
use Illuminate\Support\Facades\Route;

Route::middleware(ApiKeyOrFrontend::class)->group(function () {
    Route::get('/movies/popular', [MovieController::class, 'popular']);
    Route::get('/movies/search', [MovieController::class, 'search']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);
});
