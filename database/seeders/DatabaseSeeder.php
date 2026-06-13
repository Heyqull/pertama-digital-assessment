<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@pertamadigital.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        $editor = User::create([
            'name' => 'Editor User',
            'email' => 'editor@pertamadigital.com',
            'password' => Hash::make('password'),
            'role' => 'editor',
        ]);

        $reader = User::create([
            'name' => 'Reader User',
            'email' => 'reader@pertamadigital.com',
            'password' => Hash::make('password'),
            'role' => 'reader',
        ]);

        $post1 = Post::create([
            'title' => 'Welcome to our blogging platform!',
            'content' => 'This is the very first blog post on our new junior-friendly platform. Feel free to explore, comment, and read posts!',
            'user_id' => $admin->id,
        ]);

        $post2 = Post::create([
            'title' => 'Writing great content',
            'content' => 'As an editor, my goal is to share tips on how to structure a good blog post. Always keep paragraphs concise and engage your audience.',
            'user_id' => $editor->id,
        ]);

        $post3 = Post::create([
            'title' => 'The future of Web Development',
            'content' => 'Single page applications powered by backend APIs are standard. Laravel and React represent an incredibly productive stack.',
            'user_id' => $admin->id,
        ]);

        Comment::create([
            'content' => 'Great first post! Happy to be here.',
            'post_id' => $post1->id,
            'user_id' => $reader->id,
        ]);

        Comment::create([
            'content' => 'Very insightful tips, will use this in my next writing session.',
            'post_id' => $post2->id,
            'user_id' => $reader->id,
        ]);
    }
}
