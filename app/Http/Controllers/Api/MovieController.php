<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MovieDbService;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function popular(MovieDbService $movieDb)
    {
        return response()->json($movieDb->popular());
    }

    public function search(Request $request, MovieDbService $movieDb)
    {
        return response()->json($movieDb->search($request->input('q', '')));
    }

    public function show($id, MovieDbService $movieDb)
    {
        return response()->json($movieDb->find($id));
    }
}
