<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Auth\Events\Registered;

class RegistrationController extends Controller
{
  

    public function showUserRegistrationForm()
    {
        return inertia('auth/UserRegister');
    }
 public function userRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:15',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);

        // Kirim email verifikasi
        event(new Registered($user));

        // Login user (opsional)
        auth()->login($user);

        // Redirect ke halaman verifikasi email
       return redirect()->route('verification.notice')->with([
        'success' => 'Registration successful! Please check your email for verification link.'
    ]);
    }
}