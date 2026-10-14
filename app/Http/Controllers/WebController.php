<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class WebController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome');
    }

    public function show($id)
    {
        return Inertia::render('movies/show', ['id' => $id]);
    }
}
