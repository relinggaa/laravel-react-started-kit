<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserOrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $orders = Order::with(['destination', 'testimonial'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_id' => $order->order_id,
                    'destination_name' => $order->destination->location ?? 'N/A',
                    'destination_id' => $order->destination_id,
                    'package_id' => $order->package_id,
                    'price' => number_format($order->price, 0, ',', '.'),
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('d M Y H:i'),
                    'has_testimonial' => $order->testimonial !== null,
                    'testimonial' => $order->testimonial ? [
                        'id' => $order->testimonial->id,
                        'content' => $order->testimonial->content,
                        'rating' => $order->testimonial->rating,
                        'image_url' => $order->testimonial->image_url,
                        'is_approved' => $order->testimonial->is_approved,
                        'created_at' => $order->testimonial->created_at->format('d M Y H:i'),
                    ] : null
                ];
            });

        return Inertia::render('Pesanan', [
            'orders' => $orders
        ]);
    }

    public function storeTestimonial(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
            'destination_id' => 'required|exists:destinations,id',
            'content' => 'required|string|min:1|max:500',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Pastikan order milik user yang sedang login
        $order = Order::where('id', $request->order_id)
                    ->where('user_id', Auth::id())
                    ->firstOrFail();

        // Pastikan order status completed
        if ($order->status !== 'completed') {
            return redirect()->back()->with('error', 'Hanya order yang sudah complete yang dapat memberikan testimoni.');
        }

        // Cek apakah sudah ada testimonial untuk order ini
        if ($order->testimonial) {
            return redirect()->back()->with('error', 'Anda sudah memberikan testimoni untuk order ini.');
        }

        // Upload gambar jika ada
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('testimonials', 'public');
        }

        Testimonial::create([
            'user_id' => Auth::id(),
            'order_id' => $request->order_id,
            'destination_id' => $request->destination_id,
            'content' => $request->content,
            'rating' => $request->rating,
            'image' => $imagePath,
            'is_approved' => false
        ]);

        return redirect()->back()->with('success', 'Testimoni berhasil dikirim! Menunggu persetujuan admin.');
    }
}