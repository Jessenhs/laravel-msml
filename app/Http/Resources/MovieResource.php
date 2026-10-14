<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource['id'],
            'title' => $this->resource['title'] ?? '',
            'overview' => $this->resource['overview'] ?? '',
            'poster_url' => isset($this->resource['poster_path'])
                ? config('services.tmdb.image_url').$this->resource['poster_path']
                : null,
            'release_date' => $this->resource['release_date'] ?? '',
        ];
    }
}
