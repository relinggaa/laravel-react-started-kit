<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserOrderController;
use App\Http\Controllers\AdminTestimonialController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegistrationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\MidtransController; 
Route::get('/', [DestinationController::class, 'indexLanding'])->name('landing');
Route::get('/destinations/{id}', [DestinationController::class, 'show'])->name('destinations.show');
Route::post('/midtrans/notification', [MidtransController::class, 'handleNotification'])->name('midtrans.notification');
// Admin Routes
Route::prefix('admin')->group(function () {
    // Admin Login Routes
    Route::get('/login', [AuthController::class, 'showAdminLogin'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'adminLogin']);
    // Di dalam prefix('admin') atau middleware('auth', 'admin')
    Route::middleware(['auth', 'admin'])->put('/orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.updateStatus');
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
    Route::middleware(['auth', 'admin'])->get('/orders', [OrderController::class, 'index'])->name('admin.orders');
});
// Admin testimonial routes
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/testimonials', [AdminTestimonialController::class, 'index'])->name('admin.testimonials');
    Route::put('/testimonials/{id}/approve', [AdminTestimonialController::class, 'approve'])->name('admin.testimonials.approve');
    Route::put('/testimonials/{id}/reject', [AdminTestimonialController::class, 'reject'])->name('admin.testimonials.reject');
    Route::delete('/testimonials/{id}', [AdminTestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');
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
Route::middleware(['auth', 'user'])->group(function () {
    Route::get('/user/orders', [UserOrderController::class, 'index'])->name('user.orders');
    Route::post('/user/testimonials', [UserOrderController::class, 'storeTestimonial'])->name('user.testimonials.store');
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
        return inertia('auth/VerifyEmail');
    })->name('verification.notice');

    // PERBAIKI ROUTE INI
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();

        // JANGAN logout langsung, biarkan user tetap login
        // auth()->logout();

        
        return redirect()->route('landing')->with('success', 'Email verified successfully!');
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