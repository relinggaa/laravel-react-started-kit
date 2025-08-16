<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
     
        if (!auth()->check()) {
            return redirect()->route('user.login'); // Arahkan ke halaman login jika belum terautentikasi
        }

        // Pastikan pengguna bukan admin
        if (auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized action.'); // Jika admin, beri respon 403 Forbidden
        }

        return $next($request); // Lanjutkan ke request berikutnya jika valid
    }
}
