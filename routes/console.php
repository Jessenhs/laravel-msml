<?php

use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('token:create {email}', function ($email) {
    $user = User::where('email', $email)->first();

    if (! $user) {
        return $this->error('Geen gebruiker gevonden met dit e-mailadres.');
    }

    $this->info($user->createToken('api')->plainTextToken);
})->purpose('Maak een API-token voor een gebruiker');
