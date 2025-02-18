<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', function(){
        return Inertia::render('Dashboard/Index');
    })->name('index');

    Route::resource('users', \App\Http\Controllers\UserController::class);
    Route::resource('permissions', \App\Http\Controllers\PermissionController::class);
    Route::resource('roles', \App\Http\Controllers\RoleController::class);
    // Route::get('/settings', [App\Http\Controllers\SettingController::class, 'index'])->name('settings.index');
    // Route::put('/settings', [App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
