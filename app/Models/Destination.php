<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'spot',
        'package',
        'rundown',
        'price',
        'duration',
        'images'
    ];

    protected $casts = [
        'package' => 'array',
        'rundown' => 'array',
        'price' => 'array',
        'images' => 'array',
    ];

    // Accessor untuk mendapatkan full URL gambar
    public function getImageUrlsAttribute()
    {
        if (empty($this->images)) {
            return [];
        }

        return array_map(function ($image) {
            return Storage::url($image);
        }, $this->images);
    }

    // Method untuk menghapus gambar dari storage
    public function deleteImages(array $imagesToDelete)
    {
        foreach ($imagesToDelete as $image) {
            Storage::disk('public')->delete($image);
        }

        $remainingImages = array_diff($this->images ?? [], $imagesToDelete);
        $this->update(['images' => array_values($remainingImages)]);
    }
}