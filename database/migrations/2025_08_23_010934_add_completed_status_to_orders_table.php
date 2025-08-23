<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // Untuk MySQL
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'success', 'failed', 'canceled', 'completed') NOT NULL DEFAULT 'pending'");
        
        // Untuk PostgreSQL
        // DB::statement("ALTER TABLE orders ALTER COLUMN status TYPE VARCHAR(255)");
        // DB::statement("ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'pending'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'success', 'failed', 'canceled') NOT NULL DEFAULT 'pending'");
    }
};
