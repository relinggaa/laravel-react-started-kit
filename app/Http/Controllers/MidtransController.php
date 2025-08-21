<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MidtransController extends Controller
{
    public function handleNotification(Request $request)
    {
        \Log::info('Midtrans Notification Received:', $request->all());

        // Verifikasi signature (optional tapi recommended)
        $serverKey = config('midtrans.server_key');
        $hashed = hash('sha512', 
            $request->order_id . 
            $request->status_code . 
            $request->gross_amount . 
            $serverKey
        );

        if ($hashed !== $request->signature_key) {
            \Log::error('Invalid Midtrans signature');
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        // Cari order berdasarkan order_id
        $order = Order::where('order_id', $request->order_id)->first();

        if (!$order) {
            \Log::error('Order not found: ' . $request->order_id);
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Update status berdasarkan response Midtrans
        $transactionStatus = $request->transaction_status;
        $fraudStatus = $request->fraud_status;

        \Log::info("Transaction Status: $transactionStatus, Fraud Status: $fraudStatus");

        // Mapping status Midtrans ke status database
        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $order->status = 'success';
            } else {
                $order->status = 'failed';
            }
        } elseif ($transactionStatus == 'settlement') {
            $order->status = 'success';
        } elseif ($transactionStatus == 'pending') {
            $order->status = 'pending';
        } elseif ($transactionStatus == 'deny' || 
                 $transactionStatus == 'expire' || 
                 $transactionStatus == 'cancel') {
            $order->status = 'failed';
        }

        // Simpan perubahan
        $order->save();

        \Log::info("Order status updated to: " . $order->status);

        return response()->json(['message' => 'Notification handled successfully']);
    }
}