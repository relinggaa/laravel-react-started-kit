<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;

class PaymentController extends Controller
{
    public function createSnapToken(Request $request)
    {
        // Set konfigurasi Midtrans
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$clientKey = env('MIDTRANS_CLIENT_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // Data transaksi
        $transaction_details = [
            'order_id' => 'ORDER-' . time(),
            'gross_amount' => $request->price, // Gunakan harga yang diterima dari frontend
        ];

        // Data item
        $item_details = [
            [
                'id' => 'item1',
                'price' => $request->price,
                'quantity' => 1,
                'name' => 'Tour Package',
            ],
        ];

        // Data pelanggan
        $customer_details = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
        ];

        // Data transaksi lengkap
        $transaction_data = [
            'transaction_details' => $transaction_details,
            'item_details' => $item_details,
            'customer_details' => $customer_details,
        ];

        try {
            // Membuat Snap token
            $snap_token = Snap::getSnapToken($transaction_data);
            return response()->json(['snap_token' => $snap_token]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function paymentNotification(Request $request)
{
    $notif = new \Midtrans\Notification();
    $transaction_status = $notif->transaction_status;
    $order_id = $notif->order_id;

    // Logika untuk memeriksa dan memperbarui status pembayaran berdasarkan status transaksi
    $order = Order::where('order_id', $order_id)->first();
    if ($order) {
        switch ($transaction_status) {
            case 'settlement':
                $order->payment_status = 'paid';
                break;
            case 'pending':
                $order->payment_status = 'waiting';
                break;
            case 'expire':
                $order->payment_status = 'expired';
                break;
            default:
                $order->payment_status = 'failed';
                break;
        }
        $order->save();
    }

    return response()->json(['status' => 'success']);
}

}
