<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTestimonialController extends Controller
{
    /**
     * Display a listing of the testimonials.
     */
    public function index()
    {
        $testimonials = Testimonial::with(['user', 'destination', 'order'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($testimonial) {
                return [
                    'id' => $testimonial->id,
                    'user_name' => $testimonial->user->name,
                    'destination_name' => $testimonial->destination->location ?? 'N/A',
                    'order_id' => $testimonial->order->order_id,
                    'content' => $testimonial->content,
                    'rating' => $testimonial->rating,
                    'image_url' => $testimonial->image_url,
                    'is_approved' => $testimonial->is_approved,
                    'created_at' => $testimonial->created_at->format('d M Y H:i'),
                ];
            });

        return Inertia::render('Testimoni', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Approve a testimonial.
     */
    public function approve($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->is_approved = true;
        $testimonial->save();

        return redirect()->back()->with('success', 'Testimoni berhasil disetujui.');
    }

    /**
     * Reject a testimonial.
     */
    public function reject($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->is_approved = false;
        $testimonial->save();

        return redirect()->back()->with('success', 'Testimoni berhasil ditolak.');
    }

    /**
     * Delete a testimonial.
     */
    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        
        // Hapus gambar jika ada
        if ($testimonial->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($testimonial->image);
        }
        
        $testimonial->delete();

        return redirect()->back()->with('success', 'Testimoni berhasil dihapus.');
    }
}