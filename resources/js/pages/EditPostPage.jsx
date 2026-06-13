import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { ArrowLeft } from 'lucide-react';

export default function EditPostPage({ post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/posts/' + post.id);
    };

    const errorList = Object.values(errors);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link
                    href={'/posts/' + post.id}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition-colors font-semibold mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Article
                </Link>

                <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Edit Article</h2>
                        <p className="text-slate-400 text-xs mt-1 font-semibold">Update details and save your changes. Review before saving.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {errorList.length > 0 && (
                            <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 space-y-1 font-semibold">
                                {errorList.map((err, i) => (
                                    <p key={i}>{err}</p>
                                ))}
                            </div>
                        )}
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">Article Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                required
                                className="w-full border border-slate-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-slate-50 placeholder-slate-400 font-semibold"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">Content Body</label>
                            <textarea
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                rows={14}
                                required
                                className="w-full border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-slate-50 placeholder-slate-400 leading-relaxed"
                            />
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                            <Link
                                href={'/posts/' + post.id}
                                className="border border-slate-200 hover:border-slate-300 rounded-full px-6 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-all bg-white shadow-sm"
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
