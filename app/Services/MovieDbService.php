<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class MovieDbService
{
    public function popular()
    {
        $response = Http::get(config('services.tmdb.endpoint').'/movie/popular', [
            'api_key' => config('services.tmdb.key'),
        ])->json();

        return $response['results'] ?? [];
    }

    public function search($query)
    {
        $response = Http::get(config('services.tmdb.endpoint').'/search/movie', [
            'api_key' => config('services.tmdb.key'),
            'query' => $query,
        ])->json();

        return $response['results'] ?? [];
    }

    public function find($id)
    {
        return Http::get(config('services.tmdb.endpoint').'/movie/'.$id, [
            'api_key' => config('services.tmdb.key'),
        ])->json();
    }
}
