<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Midtrans\Snap;
use Midtrans\Config;
class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index()
{
    $destinations = Destination::orderBy('created_at', 'desc')->get()->map(function($destination) {
        // Handle jika images null atau tidak valid
        $images = json_decode($destination->images) ?? [];
        
        // Pastikan $images adalah array sebelum diproses
        if (!is_array($images)) {
            $images = [];
        }

        // Konversi path gambar ke URL
        $destination->images = array_map(function ($imagePath) {
            return $imagePath ? Storage::url($imagePath) : null;
        }, $images);

        return $destination;
    });

    return Inertia::render('DashboardAdmin', [
        'destinations' => $destinations
    ]);
}

public function indexLanding()
{
    // Ambil data destinasi dan pastikan images diubah menjadi URL
    $destinations = Destination::all()->map(function ($destination) {
        // Handle jika images null atau tidak valid
        $images = json_decode($destination->images) ?? [];

        // Pastikan $images adalah array sebelum diproses
        if (!is_array($images)) {
            $images = [];
        }

        // Konversi path gambar ke URL
        $destination->images = array_map(function ($imagePath) {
            return $imagePath ? Storage::url($imagePath) : null;
        }, $images);

        return $destination;
    });

    // Ambil data testimoni yang sudah approved dengan relasi user
    $testimonials = \App\Models\Testimonial::with(['user', 'destination'])
        ->where('is_approved', true)
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($testimonial) {
            return [
                'id' => $testimonial->id,
                'user_name' => $testimonial->user->name,
                'user_username' => '@' . strtolower(str_replace(' ', '', $testimonial->user->name)),
                'destination_name' => $testimonial->destination->name ?? 'Destinasi',
                'content' => $testimonial->content,
                'rating' => $testimonial->rating,
                'image_url' => $testimonial->image_url,
                'created_at' => $testimonial->created_at->format('d M Y'),
            ];
        });

    // Ambil data pengguna yang sedang login
    $user = Auth::user();

    return Inertia::render('landing', [
        'destinations' => $destinations,
        'testimonials' => $testimonials, // Kirim data testimoni ke frontend
        'auth' => [
            'user' => Auth::user() ? [
                'id' => Auth::user()->id,
                'username' => Auth::user()->username,
                'email' => Auth::user()->email,
            ] : null
        ],
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Menampilkan form untuk menambah destinasi baru
        return Inertia::render('DestinationForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input yang diterima dari frontend
        $data = $request->validate([
            'location' => 'required|string',
            'spot'     => 'required|string',
            'package'  => 'required|array',
            'rundown'  => 'required|array',
            'price'    => 'required|array',
            'duration' => 'required|string',
            'new_images' => 'nullable|array',
            'new_images.*' => 'file|mimes:jpg,jpeg,png|max:2048', // Validasi gambar
        ]);

        // Simpan destinasi baru
        $destination = Destination::create($data);

        // Proses gambar baru jika ada
        if ($request->has('new_images')) {
            $images = [];
            foreach ($request->file('new_images') as $image) {
                // Simpan gambar dan ambil path-nya
                $imagePath = $image->store('destinations/images', 'public');
                $images[] = $imagePath;
            }

            // Simpan path gambar ke database
            $destination->images = json_encode($images);
            $destination->save();
        }

        // Redirect ke halaman destinasi setelah berhasil menyimpan
        return redirect()->route('destinations.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Destination $destination)
    {
        // Menampilkan form untuk mengedit destinasi dengan data yang sudah ada
        return Inertia::render('DestinationForm', [
            'destination' => $destination
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Destination $destination)
{
    // Validasi input
    $data = $request->validate([
        'location' => 'required|string',
        'spot'     => 'required|string',
        'package'  => 'required|array',
        'rundown'  => 'required|array',
        'price'    => 'required|array',
        'duration' => 'required|string',
        'new_images' => 'nullable|array',
        'deleted_images' => 'nullable|array',
    ]);

    // Update data utama
    $destination->update($data);

    // Proses gambar yang dihapus
    if ($request->has('deleted_images') && is_array($request->deleted_images)) {
        foreach ($request->deleted_images as $imagePath) {
            Storage::disk('public')->delete($imagePath);
        }
    }

    // Proses gambar baru (jika ada file yang diupload)
    if ($request->hasFile('new_images')) {
        $images = json_decode($destination->images, true) ?? [];
        
        foreach ($request->file('new_images') as $image) {
            $imagePath = $image->store('destinations/images', 'public');
            $images[] = $imagePath;
        }

        $destination->images = json_encode($images);
        $destination->save();
    }

    return redirect()->route('destinations.index');
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Destination $destination)
    {
        // Hapus gambar jika ada
        if ($destination->images) {
            $images = json_decode($destination->images, true);
            foreach ($images as $image) {
                Storage::disk('public')->delete($image); // Hapus gambar dari storage
            }
        }

        // Hapus destinasi dari database
        $destination->delete();

        // Redirect ke halaman destinasi setelah berhasil menghapus
        return redirect()->route('destinations.index');
    }
public function show($id)
{
    $destination = Destination::findOrFail($id);

    // Check if 'images' is a string and needs decoding
    if (is_string($destination->images)) {
        $destination->images = json_decode($destination->images, true);
    }

    // Ensure 'images' is always an array (fallback to empty array if it's not an array after decoding)
    if (!is_array($destination->images)) {
        $destination->images = [];
    }

    // Do the same for other fields: package, rundown, price
    if (is_string($destination->package)) {
        $destination->package = json_decode($destination->package, true);
    }
    if (is_string($destination->rundown)) {
        $destination->rundown = json_decode($destination->rundown, true);
    }
    if (is_string($destination->price)) {
        $destination->price = json_decode($destination->price, true);
    }

    // Ensure they are always arrays
    $destination->package = is_array($destination->package) ? $destination->package : [];
    $destination->rundown = is_array($destination->rundown) ? $destination->rundown : [];
    $destination->price = is_array($destination->price) ? $destination->price : [];

    // Convert image paths to URLs
    $destination->images = array_map(function ($imagePath) {
        return $imagePath ? Storage::url($imagePath) : null;
    }, $destination->images);

    return Inertia::render('DestinationDetail', [
        'destination' => $destination
    ]);
}
public function createOrder(Request $request)
{
    \Log::info('Order request received:', $request->all());
    
    // Validasi input
    $validated = $request->validate([
        'destination_id' => 'required|exists:destinations,id',
        'package_id' => 'required|integer',
        'price' => 'required|numeric',
        'user_id' => 'required|exists:users,id',
    ]);

    // Konfigurasi Midtrans yang benar
    Config::$serverKey = config('midtrans.server_key');
    Config::$clientKey = config('midtrans.client_key');
    Config::$isProduction = config('midtrans.is_production', false);
    Config::$isSanitized = true;
    Config::$is3ds = true;

    // Pastikan server key tidak kosong
    if (empty(Config::$serverKey)) {
        \Log::error('Midtrans server key is empty!');
        return response()->json([
            'message' => 'Payment gateway configuration error'
        ], 500);
    }

    $destination = Destination::findOrFail($validated['destination_id']);
    $user = User::findOrFail($validated['user_id']);

    // Buat order ID yang unik
    $orderId = 'ORDER-' . time() . '-' . $validated['user_id'];

    $transactionDetails = [
        'order_id' => $orderId,
        'gross_amount' => (int) $validated['price'], // Pastikan integer
    ];

    $customerDetails = [
        'first_name' => $user->name,
        'email' => $user->email,
        'phone' => $user->phone ?? '',
    ];

    $itemDetails = [
        [
            'id' => (string) $destination->id,
            'price' => (int) $validated['price'], // Pastikan integer
            'quantity' => 1,
            'name' => $destination->name . ' Package ' . ($validated['package_id'] + 1),
        ]
    ];

    try {
        $snapToken = Snap::getSnapToken([
            'transaction_details' => $transactionDetails,
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
        ]);

        // Simpan order ke database
        $order = Order::create([
            'order_id' => $orderId,
            'user_id' => $validated['user_id'],
            'destination_id' => $validated['destination_id'],
            'package_id' => $validated['package_id'],
            'price' => $validated['price'],
            'status' => 'pending',
            'snap_token' => $snapToken,
        ]);

        return response()->json([
            'snap_token' => $snapToken,
            'order_id' => $orderId
        ]);
        
    } catch (\Exception $e) {
        \Log::error('Midtrans error: ' . $e->getMessage());
        \Log::error('Midtrans error details: ', [
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);
        
        return response()->json([
            'message' => 'Payment gateway error: ' . $e->getMessage()
        ], 500);
    }
}
public function updateOrderStatus(Request $request, $orderId)
{
    $order = Order::findOrFail($orderId);
    $order->status = $request->input('status');
    $order->save();

    return response()->json(['message' => 'Order status updated successfully']);
}
}
