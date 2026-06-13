import React from 'react';
import { Link, usePage, router, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function PostDetailPage({ post }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, post: postComment, processing, reset, errors } = useForm({
        content: '',
    });

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        router.delete('/posts/' + post.id);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        postComment('/posts/' + post.id + '/comments', {
            onSuccess: () => reset(),
        });
    };

    const canEdit = post && user && (user.role == 'admin' || (user.role == 'editor' && user.id == post.user_id));
    const canDelete = post && user && user.role == 'admin';

    const comments = post.comments || [];

    return (
        <Layout>
            <div className="space-y-6">
                {/* Back button */}
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black font-medium">
                    ← Back to All Posts
                </Link>

                {/* Post content */}
                <article className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
                        <div className="flex gap-2 shrink-0">
                            {canEdit && (
                                <Link
                                    href={'/posts/' + post.id + '/edit'}
                                    className="border rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                                >
                                    Edit
                                </Link>
                            )}
                            {canDelete && (
                                <button
                                    onClick={handleDelete}
                                    className="border rounded px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">{post.user?.name}</span>
                        <span className="border rounded px-2 py-0.5 uppercase bg-gray-50 text-[10px] font-semibold tracking-wider text-gray-600">
                            {post.user?.role}
                        </span>
                        <span>•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>

                    <hr />

                    <p className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
                </article>

                <hr />

                {/* Comments section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>

                    {/* Comment form */}
                    {user ? (
                        <form onSubmit={handleCommentSubmit} className="space-y-2">
                            {errors.content && (
                                <p className="text-sm text-red-500">{errors.content}</p>
                            )}
                            <textarea
                                placeholder="Write a comment..."
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                rows={3}
                                required
                                className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button
                                type="submit"
                                disabled={processing || !data.content.trim()}
                                className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </button>
                        </form>
                    ) : (
                        <p className="text-sm text-gray-500">
                            <Link href="/login" className="text-black underline font-medium">Login</Link> to leave a comment.
                        </p>
                    )}

                    {/* Comment list */}
                    <div className="space-y-3">
                        {comments.length == 0 ? (
                            <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
                        ) : (
                            comments.map(comment => (
                                <div key={comment.id} className="border rounded-lg p-4 bg-white shadow-sm">
                                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                                        <span className="font-semibold text-gray-700">{comment.user?.name}</span>
                                        <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
