<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('job_listings', function (Blueprint $table) {
            // Drop the old category column (text field)
            $table->dropColumn('category');
            
            // Add category_id foreign key
            $table->unsignedBigInteger('category_id')->nullable()->after('location');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            
            // Add is_featured column
            $table->boolean('is_featured')->default(false)->after('logo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_listings', function (Blueprint $table) {
            // Drop foreign key and category_id column
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
            
            // Drop is_featured column
            $table->dropColumn('is_featured');
            
            // Restore old category column
            $table->string('category')->after('location');
        });
    }
};
