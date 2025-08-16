<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle admin login request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function adminLogin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('username', 'password');
        $remember = $request->filled('remember');

        if (!Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages([
                'username' => __('auth.failed'),
            ]);
        }

        if (!auth()->user()->isAdmin()) {
            Auth::logout();
            throw ValidationException::withMessages([
                'username' => __('Only administrators can access this area'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/dashboard')
            ->with('success', __('Welcome back, administrator!'));
    }

    /**
     * Handle user login request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function userLogin(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('username', 'password');
        $remember = $request->filled('remember');

        if (!Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages([
                'username' => __('auth.failed'),
            ]);
        }

        if (!auth()->user()->hasVerifiedEmail()) {
            Auth::logout();
            throw ValidationException::withMessages([
                'username' => __('Please verify your email address before logging in'),
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/')
            ->with('success', __('Welcome back!'));
    }

    /**
     * Log the user out of the application
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', __('You have been logged out'));
    }
}