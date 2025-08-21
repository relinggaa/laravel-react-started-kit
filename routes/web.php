<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegistrationController;

Route::get('/', [DestinationController::class, 'indexLanding'])->name('landing');
Route::get('/destinations/{id}', [DestinationController::class, 'show'])->name('destinations.show');

// Admin Routes
Route::prefix('admin')->group(function () {
    // Admin Login Routes
    Route::get('/login', [AuthController::class, 'showAdminLogin'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'adminLogin']);

    // Rute untuk create dan edit destinasi
    Route::get('/destinations/create', [DestinationController::class, 'create'])->name('destinations.create');
    Route::get('/destinations/{destination}/edit', [DestinationController::class, 'edit'])->name('destinations.edit');
    
    // Rute untuk mengupdate destinasi (PUT)
    Route::put('/destinations/{destination}', [DestinationController::class, 'update'])->name('destinations.update');
    
    // Rute untuk menghapus destinasi
    Route::delete('/destinations/{destination}', [DestinationController::class, 'destroy'])->name('destinations.destroy');
    
    // Admin Dashboard
    Route::middleware(['auth', 'admin'])->get('/dashboard', [DestinationController::class, 'index'])->name('admin.dashboard');

    // CRUD destinasi
    Route::middleware(['auth', 'admin'])->resource('destinations', DestinationController::class)->except(['show']);
});

// User Routes
Route::prefix('user')->group(function () {
    Route::get('/register', [RegistrationController::class, 'showUserRegisterForm'])->name('user.register');
    Route::post('/register', [RegistrationController::class, 'userRegister']);
    
    Route::get('/login', [AuthController::class, 'showUserLogin'])->name('user.login');
    Route::post('/login', [AuthController::class, 'userLogin']);
});

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Admin protected routes
    Route::middleware('admin')->group(function () {
        Route::get('/dashboard', [DestinationController::class, 'index'])->name('dashboard');
        Route::resource('destinations', DestinationController::class)->except(['show']);
    });
    
    // User protected routes
     Route::middleware('user')->prefix('user')->group(function () {
        Route::get('/dashboard', function () {
            // Setelah login, arahkan ke halaman landing
            return redirect()->route('landing');
        })->name('user.dashboard');
    });
    
});
// Order API Routes
Route::middleware('auth')->post('/api/create-order', [DestinationController::class, 'createOrder'])->name('order.create');
Route::middleware('auth')->put('/api/update-order-status/{orderId}', [DestinationController::class, 'updateOrderStatus'])->name('order.update');

// User Registration Routes
Route::middleware('guest')->group(function () {
    Route::get('/user/register', [RegistrationController::class, 'showUserRegistrationForm'])->name('user.register');
    Route::post('/user/register', [RegistrationController::class, 'userRegister'])->name('user.register.submit');
});


// Email Verification Routes
Route::middleware('auth')->group(function () {
    Route::get('/email/verify', function () {
        return inertia('Auth/VerifyEmail');
    })->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        auth()->logout();
        return redirect()->route('user.login')->with('success', 'Email verified successfully! You can now login.');
    })->middleware(['signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('status', 'verification-link-sent');
    })->middleware(['throttle:6,1'])->name('verification.send');
});

// User Login Routes
Route::middleware('guest')->group(function () {
    Route::get('/user/login', [AuthController::class, 'showUserLogin'])->name('user.login');
    Route::post('/user/login', [AuthController::class, 'userLogin']);
});


Route::get('/test-email', function() {
    // Cari user dengan ID 17
    $user = App\Models\User::find(17);
    
    if (!$user) {
        return 'User dengan ID 17 tidak ditemukan!';
    }
    
    // Kirim notifikasi verifikasi email
    $user->notify(new Illuminate\Auth\Notifications\VerifyEmail);
    
    return 'Email verification sent to user ID 17 (' . $user->email . ')';
});

Route::get('/test-raw-email', function() {
    try {
        Mail::raw('Test email content', function($message) {
            $message->to('linggayorfel@gmail.com')
                    ->subject('Test Email');
        });
        return 'Raw email sent successfully';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;



Route::get('/test-mailtrap', function() {
    try {
        Mail::raw('Test email content', function($message) {
            $message->to('relinggayorfel@gmail.com')   
                    ->subject('Test Email');
        });

        return 'Test email sent successfully';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});
Route::middleware(['auth'])->group(function () {
    Route::post('/api/orders', [DestinationController::class, 'createOrder'])->name('order.create');
});
// Di web.php
Route::get('/debug-env', function() {
    return response()->json([
        'app_env' => env('APP_ENV'),
        'midtrans_server_key' => env('MIDTRANS_SERVER_KEY'),
        'midtrans_client_key' => env('MIDTRANS_CLIENT_KEY'),
        'midtrans_is_production' => env('MIDTRANS_IS_PRODUCTION'),
        'config_server_key' => config('midtrans.server_key'),
        'config_client_key' => config('midtrans.client_key'),
        'config_is_production' => config('midtrans.is_production'),
    ]);
});