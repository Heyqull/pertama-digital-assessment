import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function CreatePostPage() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/posts');
    };

    const errorList = Object.values(errors);

    return (
        <Layout>
            <div className="space-y-4">
                <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-black font-medium">
                    ← Back to All Posts
                </Link>

                <div className="border rounded-lg p-6 bg-white shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Create New Post</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorList.length > 0 && (
                            <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2 space-y-1">
                                {errorList.map((err, i) => (
                                    <p key={i}>{err}</p>
                                ))}
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium block mb-1">Title</label>
                            <input
                                type="text"
                                placeholder="Enter a descriptive title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">Content</label>
                            <textarea
                                placeholder="Write your post content here..."
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                rows={12}
                                required
                                className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Publishing...' : 'Publish Post'}
                            </button>
                            <Link
                                href="/"
                                className="border rounded px-4 py-2 text-sm font-medium hover:bg-gray-50 shadow-sm"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
