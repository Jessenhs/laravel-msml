<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class MovieDbService
{
    private PendingRequest $http;

    public function __construct()
    {
        $this->http = Http::baseUrl(config('services.tmdb.endpoint'))
            ->withQueryParameters(['api_key' => config('services.tmdb.key')])
            ->acceptJson();
    }

    public function popular(): array
    {
        $response = $this->http->get('/movie/popular')->json();

        return $response['results'] ?? [];
    }

    public function search($query): array
    {
        $response = $this->http->get('/search/movie', [
            'query' => $query,
        ])->json();

        return $response['results'] ?? [];
    }

    public function find($id): array
    {
        return $this->http->get('/movie/'.$id)->json();
    }
}
