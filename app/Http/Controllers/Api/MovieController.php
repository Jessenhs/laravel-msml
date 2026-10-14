<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MovieResource;
use App\Services\MovieDbService;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function popular(MovieDbService $movieDb)
    {
        return MovieResource::collection($movieDb->popular());
    }

    public function search(Request $request, MovieDbService $movieDb)
    {
        return MovieResource::collection($movieDb->search($request->input('q', '')));
    }

    public function show($id, MovieDbService $movieDb)
    {
        return new MovieResource($movieDb->find($id));
    }
}
