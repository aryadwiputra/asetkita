<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            "name"=> "Super Admin",
            "email"=> "superadmin@example.com",
            "username"=> "superadmin",
            "phone"=> "1234567890",
            "address"=> "Address",
            "status"=> "active",
            "password"=> bcrypt("password"),
        ]);

        // Generate 200 users
        User::factory()->count(24)->create();
    }
}
