import React from 'react';
import { Link, usePage, router, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';
import { getPostDesign } from './PostsPage';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export default function PostDetailPage({ post }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const { data, setData, post: postComment, processing, reset, errors } = useForm({
        content: '',
    });

    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [scrollProgress, setScrollProgress] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete('/posts/' + post.id, {
            onFinish: () => setShowDeleteModal(false),
        });
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
    const design = getPostDesign(post, post.id);

    return (
        <Layout>
            <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/10 z-[100] pointer-events-none">
                <div
                    className="h-full bg-orange-500 transition-all duration-75 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            <div className="bg-[#f8fafc] min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-orange-500 transition-colors font-semibold mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </Link>

                    <article className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${design.categoryBg}`}>
                                {design.category}
                            </span>
                            <span className="text-slate-400 text-xs font-semibold">
                                {new Date(post.created_at).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mt-5">
                            {post.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <img
                                    src={design.avatar}
                                    alt={post.user?.name}
                                    className="w-12 h-12 rounded-full object-cover border border-slate-100"
                                />
                                <div>
                                    <p className="text-slate-900 font-bold text-sm leading-tight">
                                        {post.user?.name}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-0.5">
                                        {design.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {canEdit && (
                                    <Link
                                        href={'/posts/' + post.id + '/edit'}
                                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                                    >
                                        Edit Article
                                    </Link>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 text-xs font-semibold text-red-500 bg-white border border-slate-200 rounded-full hover:bg-red-50 transition-colors shadow-sm"
                                    >
                                        Delete Article
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="my-8 rounded-2xl overflow-hidden aspect-[16/9] w-full bg-slate-100 relative">
                            <img
                                src={design.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </article>

                    <section className="mt-12 bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                            <MessageSquare className="w-5 h-5 text-slate-800" />
                            <h2 className="text-xl font-extrabold text-slate-900">
                                Comments ({comments.length})
                            </h2>
                        </div>

                        {user ? (
                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                {errors.content && (
                                    <p className="text-sm text-red-500 font-semibold">{errors.content}</p>
                                )}
                                <textarea
                                    placeholder="Add to the discussion..."
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows={4}
                                    required
                                    className="w-full border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-slate-50 placeholder-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={processing || !data.content.trim()}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Posting...' : 'Post Comment'}
                                </button>
                            </form>
                        ) : (
                            <p className="text-sm text-slate-500 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <Link href="/login" className="text-orange-500 font-bold hover:underline">Login</Link> to join the conversation and write a comment.
                            </p>
                        )}

                        <div className="space-y-4 pt-4">
                            {comments.length === 0 ? (
                                <p className="text-sm text-slate-400 text-center py-6">
                                    No comments yet. Be the first to start the discussion!
                                </p>
                            ) : (
                                comments.map(comment => (
                                    <div
                                        key={comment.id}
                                        className="border border-slate-100 bg-[#f8fafc]/50 rounded-2xl p-5 hover:bg-white hover:border-slate-200 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <Avatar className="h-8 w-8 ring-2 ring-slate-100">
                                                <AvatarFallback className="bg-slate-200 text-slate-700 text-xs font-bold">
                                                    {comment.user?.name.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800 leading-tight">
                                                    {comment.user?.name}
                                                </p>
                                                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                                                    {new Date(comment.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <span className="ml-auto border border-slate-100 rounded-full px-2 py-0.5 text-[9px] uppercase font-bold bg-white text-slate-400 tracking-wider">
                                                {comment.user?.role ?? 'reader'}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pl-1">
                                            {comment.content}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </Layout>
    );
}
