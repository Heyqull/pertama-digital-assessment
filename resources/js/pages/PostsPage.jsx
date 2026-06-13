import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function PostsPage({ posts }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const handleDelete = (postId) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        router.delete('/posts/' + postId);
    };

    const canEdit = (post) => user && (user.role == 'admin' || (user.role == 'editor' && user.id == post.user_id));
    const canDelete = (post) => user && user.role == 'admin';

    const postList = posts.data || [];

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Blog Posts</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {posts.total ?? 0} post{posts.total != 1 ? 's' : ''} total
                        </p>
                    </div>
                </div>

                <hr />

                {postList.length == 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg font-medium">No posts yet.</p>
                        <p className="text-sm mt-1">Be the first to write something!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {postList.map(post => (
                            <div key={post.id} className="border rounded-lg p-5 bg-white shadow-sm hover:shadow transition-shadow">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-xl font-bold">
                                        <Link href={'/posts/' + post.id} className="hover:text-gray-600">
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <div className="flex gap-2 shrink-0">
                                        {canEdit(post) && (
                                            <Link
                                                href={'/posts/' + post.id + '/edit'}
                                                className="border rounded px-2 py-1 text-xs hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                        )}
                                        {canDelete(post) && (
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="border rounded px-2 py-1 text-xs text-red-500 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {post.content}
                                </p>
                                <div className="flex items-center justify-between mt-4 text-xs text-gray-500 border-t pt-3">
                                    <div className="flex items-center gap-2">
                                        <span className="border rounded px-2 py-0.5 uppercase bg-gray-50 text-[10px] font-semibold tracking-wider text-gray-600">
                                            {post.user?.role ?? 'user'}
                                        </span>
                                        <span>by {post.user?.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span>Comments: {post.comments_count ?? 0}</span>
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="flex items-center justify-center gap-3 pt-6">
                        {posts.current_page == 1 ? (
                            <span className="border rounded px-3 py-1.5 text-sm text-gray-300 cursor-not-allowed">
                                Previous
                            </span>
                        ) : (
                            <Link
                                href={'/?page=' + (posts.current_page - 1)}
                                className="border rounded px-3 py-1.5 text-sm hover:bg-gray-50"
                            >
                                Previous
                            </Link>
                        )}

                        <span className="text-sm text-gray-500">
                            Page {posts.current_page} of {posts.last_page}
                        </span>

                        {posts.current_page == posts.last_page ? (
                            <span className="border rounded px-3 py-1.5 text-sm text-gray-300 cursor-not-allowed">
                                Next
                            </span>
                        ) : (
                            <Link
                                href={'/?page=' + (posts.current_page + 1)}
                                className="border rounded px-3 py-1.5 text-sm hover:bg-gray-50"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
