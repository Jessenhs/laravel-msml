<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class ApiController extends Controller
{
    /**
     * Show the popular movies.
     */
    public function index(): Response
    {
        $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
            'api_key' => config('services.tmdb.key'),
        ])->json();

        $movies = $response['results'] ?? [];

        return Inertia::render('welcome', ['movies' => $movies]);
    }
}
