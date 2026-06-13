import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Layout from '../components/Layout';
import { getPostDesign } from './PostsPage';
import { Trash2, Edit } from 'lucide-react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function ArchivePage({ posts }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [deletePostId, setDeletePostId] = React.useState(null);

    const handleDelete = (postId) => {
        setDeletePostId(postId);
    };

    const confirmDelete = () => {
        if (!deletePostId) return;
        router.delete('/posts/' + deletePostId, {
            onFinish: () => setDeletePostId(null),
        });
    };

    const canEdit = (post) => user && (user.role == 'admin' || (user.role == 'editor' && user.id == post.user_id));
    const canDelete = (post) => user && user.role == 'admin';

    const postList = posts.data || [];

    return (
        <Layout>
            <div className="bg-[#f8fafc] min-h-screen">
                <div className="relative bg-[#040a18] bg-gradient-to-r from-[#090d16] via-[#0e162b] to-[#090d16] text-white pt-36 pb-24 rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl overflow-hidden mb-12">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#f97316] to-[#facc15] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
                    <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                            All Articles
                        </h1>
                        <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto font-medium leading-relaxed">
                            Browse our complete collection of insights, stories, and tutorials.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-6xl py-16">
                    {postList.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto">
                            <p className="text-slate-800 text-xl font-bold">No articles found</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
                                    All Articles
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {postList.map((post, idx) => {
                                    const design = getPostDesign(post, idx);
                                    return (
                                        <div
                                            key={post.id}
                                            className="flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                                        >
                                            <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden relative">
                                                <img
                                                    src={design.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${design.categoryBg}`}>
                                                        {design.category}
                                                    </span>
                                                    <span className="text-slate-400 text-[10px] font-semibold">
                                                        {new Date(post.created_at).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>

                                                <h4 className="text-lg font-bold text-slate-900 mt-4 leading-snug group-hover:text-orange-500 transition-colors flex-grow">
                                                    <Link href={'/posts/' + post.id} className="hover:text-orange-500 transition-colors">
                                                        {post.title}
                                                    </Link>
                                                </h4>

                                                <p className="text-slate-500 mt-3 text-xs leading-relaxed line-clamp-3 mb-6">
                                                    {post.content}
                                                </p>

                                                <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                                                    <div className="flex items-center gap-2.5">
                                                        <img
                                                            src={design.avatar}
                                                            alt={post.user?.name}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <p className="text-slate-900 font-semibold text-xs leading-tight">
                                                                {post.user?.name}
                                                            </p>
                                                            <p className="text-slate-400 text-[10px] mt-0.5">
                                                                {design.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="text-slate-400 text-[10px] font-medium bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">
                                                            {post.comments_count ?? 0}
                                                        </span>

                                                        {canEdit(post) && (
                                                            <Link
                                                                href={'/posts/' + post.id + '/edit'}
                                                                className="p-1.5 border border-slate-100 hover:border-orange-500/20 hover:bg-orange-50 text-slate-400 hover:text-orange-500 rounded-full transition-all"
                                                                title="Edit Post"
                                                            >
                                                                <Edit className="w-3.5 h-3.5" />
                                                            </Link>
                                                        )}
                                                        {canDelete(post) && (
                                                            <button
                                                                onClick={() => handleDelete(post.id)}
                                                                className="p-1.5 border border-slate-100 hover:border-red-500/20 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                                                                title="Delete Post"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                </div>
                            </div>

                            {posts.last_page > 1 && (
                                <div className="flex items-center justify-center gap-3 pt-8 border-t border-slate-100">
                                    {posts.current_page == 1 ? (
                                        <span className="border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-300 cursor-not-allowed select-none bg-white inline-block w-32 text-center">
                                            Previous
                                        </span>
                                    ) : (
                                        <Link
                                            href={'/articles?page=' + (posts.current_page - 1)}
                                            className="border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm inline-block w-32 text-center"
                                        >
                                            Previous
                                        </Link>
                                    )}

                                    <span className="text-xs font-bold text-slate-400 mx-2 uppercase tracking-wider">
                                        Page {posts.current_page} of {posts.last_page}
                                    </span>

                                    {posts.current_page == posts.last_page ? (
                                        <span className="border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-300 cursor-not-allowed select-none bg-white inline-block w-32 text-center">
                                            Next
                                        </span>
                                    ) : (
                                        <Link
                                            href={'/articles?page=' + (posts.current_page + 1)}
                                            className="border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm inline-block w-32 text-center"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <footer className="bg-[#070c1a] border-t border-white/5 py-8 text-center text-slate-500 text-xs font-semibold">
                <div className="container mx-auto px-4">
                    <p>© {new Date().getFullYear()} Pertama Blog. All rights reserved.</p>
                </div>
            </footer>

            <DeleteConfirmModal
                isOpen={deletePostId !== null}
                onClose={() => setDeletePostId(null)}
                onConfirm={confirmDelete}
            />
        </Layout>
    );
}
