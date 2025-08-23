<?php
// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'user_id',
        'destination_id',
        'package_id',
        'price',
        'status',
    ];

    // Relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi dengan model Destination
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function testimonial()
    {
        return $this->hasOne(Testimonial::class);
    }
}
