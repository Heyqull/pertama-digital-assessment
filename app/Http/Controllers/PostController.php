<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')
            ->withCount('comments')
            ->latest()
            ->paginate(9);

        return Inertia::render('PostsPage', [
            'posts' => $posts,
        ]);
    }

    public function show($id)
    {
        $post = Post::with(['user', 'comments.user'])->findOrFail($id);

        return Inertia::render('PostDetailPage', [
            'post' => $post,
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        if ($user->role == 'reader') {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('CreatePostPage');
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->role == 'reader') {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post = new Post();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = $user->id;
        $post->save();

        return redirect('/posts/' . $post->id);
    }

    public function edit($id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);

        if ($user->role == 'reader') {
            abort(403, 'Unauthorized');
        }
        if ($user->role == 'editor' && $post->user_id != $user->id) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('EditPostPage', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);

        if ($user->role == 'reader') {
            abort(403, 'Unauthorized');
        }
        if ($user->role == 'editor' && $post->user_id != $user->id) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $post->title = $request->title;
        $post->content = $request->content;
        $post->save();

        return redirect('/posts/' . $post->id);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        if ($user->role != 'admin') {
            abort(403, 'Unauthorized');
        }

        $post = Post::findOrFail($id);
        $post->delete();

        return redirect('/');
    }
}
