<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Midtrans\Snap;
use Midtrans\Config;
class OrderController extends Controller
{
    /**
     * Display a listing of the orders.
     */
    public function index()
    {
           
        // Ambil semua order dengan relasi user dan destination
        $orders = Order::with(['user', 'destination'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_id' => $order->order_id,
                    'user_name' => $order->user->name,
                    'user_email' => $order->user->email,
                    'user_phone' => $order->user->phone,
                    'destination_name' => $order->destination->location?? 'N/A',
                    'package_id' => $order->package_id,
                    'price' => number_format($order->price, 0, ',', '.'),
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('d M Y H:i'),
                    'updated_at' => $order->updated_at->format('d M Y H:i'),
                ];
            });
             

        return Inertia::render('ListOrder', [
            'orders' => $orders
        ]);
    }



    /**
     * Update the status of an order.
     */
    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        
        $request->validate([
            'status' => 'required|in:pending,success,failed,completed,canceled'
        ]);

        $order->status = $request->status;
        $order->save();

        return redirect()->back()->with('success', 'Status order berhasil diupdate.');
    }

    /**
     * Delete an order.
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->back()->with('success', 'Order deleted successfully.');
    }
}