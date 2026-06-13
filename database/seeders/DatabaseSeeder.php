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
        $admin = new User();
        $admin->name = 'Admin User';
        $admin->email = 'admin@pertamadigital.com';
        $admin->password = Hash::make('password');
        $admin->role = 'admin';
        $admin->save();

        $editor = new User();
        $editor->name = 'Editor User';
        $editor->email = 'editor@pertamadigital.com';
        $editor->password = Hash::make('password');
        $editor->role = 'editor';
        $editor->save();

        $reader = new User();
        $reader->name = 'Reader User';
        $reader->email = 'reader@pertamadigital.com';
        $reader->password = Hash::make('password');
        $reader->role = 'reader';
        $reader->save();

        $post1 = new Post();
        $post1->title = 'Welcome to our blogging platform!';
        $post1->content = 'This is the very first blog post on our new junior-friendly platform. Feel free to explore, comment, and read posts!';
        $post1->user_id = $admin->id;
        $post1->save();

        $post2 = new Post();
        $post2->title = 'Writing great content';
        $post2->content = 'As an editor, my goal is to share tips on how to structure a good blog post. Always keep paragraphs concise and engage your audience.';
        $post2->user_id = $editor->id;
        $post2->save();

        $post3 = new Post();
        $post3->title = 'The future of Web Development';
        $post3->content = 'Single page applications powered by Inertia.js are standard. Laravel and React represent an incredibly productive stack.';
        $post3->user_id = $admin->id;
        $post3->save();

        $comment1 = new Comment();
        $comment1->content = 'Great first post! Happy to be here.';
        $comment1->post_id = $post1->id;
        $comment1->user_id = $reader->id;
        $comment1->save();

        $comment2 = new Comment();
        $comment2->content = 'Very insightful tips, will use this in my next writing session.';
        $comment2->post_id = $post2->id;
        $comment2->user_id = $reader->id;
        $comment2->save();
    }
}
