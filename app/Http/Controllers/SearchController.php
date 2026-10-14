<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Search movies by title.
     */
    public function index(Request $request): Response
    {
        $query = $request->input('q', '');

        $response = Http::get('https://api.themoviedb.org/3/search/movie', [
            'api_key' => config('services.tmdb.key'),
            'query' => $query,
        ])->json();

        return Inertia::render('welcome', ['movies' => $response['results'] ?? [], 'query' => $query]);
    }
}
