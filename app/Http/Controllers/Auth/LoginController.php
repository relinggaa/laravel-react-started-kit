<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    //// app/Http/Controllers/Auth/AuthController.php
public function adminLogin(Request $request)
{
    $credentials = $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    if (Auth::attempt($credentials)) {
        if (!auth()->user()->isAdmin()) {
            Auth::logout();
            return back()->withErrors(['username' => 'Only admin can login here']);
        }
        
        $request->session()->regenerate();
        return redirect()->intended('/dashboard');
    }

    return back()->withErrors(['username' => 'Invalid credentials']);
}

public function userLogin(Request $request)
{
    $credentials = $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended('/user/dashboard');
    }

    return back()->withErrors(['username' => 'Invalid credentials']);
}
}
