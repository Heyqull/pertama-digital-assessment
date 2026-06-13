import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export const getPostDesign = (post, index) => {
    const seed = post.id ?? index;
    const designs = [
        {
            category: 'SEO',
            categoryBg: 'bg-blue-50 text-blue-600 border-blue-100',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
            role: 'SEO Specialist',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'Social',
            categoryBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
            role: 'Social Media Manager',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'Content',
            categoryBg: 'bg-purple-50 text-purple-600 border-purple-100',
            image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&auto=format&fit=crop&q=80',
            role: 'Content Director',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'Strategy',
            categoryBg: 'bg-amber-50 text-amber-600 border-amber-100',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
            role: 'Digital Strategist',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'Analytics',
            categoryBg: 'bg-sky-50 text-sky-600 border-sky-100',
            image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80',
            role: 'Analytics Expert',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'ROI',
            categoryBg: 'bg-teal-50 text-teal-600 border-teal-100',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
            role: 'Marketing Analyst',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'Trends',
            categoryBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
            image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=80',
            role: 'Industry Analyst',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop&q=80'
        },
        {
            category: 'Tech',
            categoryBg: 'bg-rose-50 text-rose-600 border-rose-100',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
            role: 'Web Developer',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80'
        }
    ];

    const designIndex = seed % designs.length;
    return designs[designIndex];
};

export default function PostsPage({ posts }) {
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
    const isFirstPage = posts.current_page === 1;

    const featuredPosts = isFirstPage && postList.length > 0 ? postList.slice(0, Math.min(3, postList.length)) : [];
    const gridPosts = isFirstPage && postList.length > 0 ? postList.slice(featuredPosts.length) : postList;

    const [activeSlide, setActiveSlide] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (featuredPosts.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % featuredPosts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [featuredPosts.length, isHovered]);

    return (
        <Layout>
            <div className="bg-[#f8fafc] min-h-screen">
                {isFirstPage && featuredPosts.length > 0 ? (
                    <div
                        className="relative w-full h-[520px] md:h-[620px] bg-slate-900 rounded-b-[2.5rem] md:rounded-b-[3.5rem] shadow-xl overflow-hidden group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {featuredPosts.map((post, idx) => {
                            const design = getPostDesign(post, idx);
                            const isActive = idx === activeSlide;
                            return (
                                <div
                                    key={post.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                        isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                                    }`}
                                >
                                    <img
                                        src={design.image}
                                        alt={post.title}
                                        className="absolute inset-0 w-full h-full object-cover select-none"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/30 md:to-transparent" />
                                    
                                    <div className="absolute inset-0 z-20 pt-36 pb-16 flex flex-col justify-end">
                                        <Link href={'/posts/' + post.id} className="container mx-auto px-4 max-w-6xl h-full flex flex-col justify-end text-white select-none">
                                            <span className="text-xs font-bold tracking-wider text-orange-400 mb-2 uppercase">
                                                Featured
                                            </span>
                                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white hover:text-orange-400 transition-colors max-w-3xl">
                                                {post.title}
                                            </h2>
                                            <p className="text-slate-300 text-sm md:text-base mt-4 line-clamp-2 leading-relaxed max-w-xl">
                                                {post.content}
                                            </p>
                                            <div className="flex items-center gap-3 mt-8">
                                                <img
                                                    src={design.avatar}
                                                    alt={post.user?.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                                                />
                                                <div>
                                                    <p className="text-white font-bold text-sm leading-none">
                                                        {post.user?.name}
                                                    </p>
                                                    <p className="text-slate-400 text-xs mt-1">
                                                        {design.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

                        {featuredPosts.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveSlide((prev) => (prev + 1) % featuredPosts.length);
                                    }}
                                    className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex items-center justify-center text-white hover:text-orange-400 transition-all hover:scale-110 z-30"
                                    title="Next Slide"
                                >
                                    <span className="text-3xl md:text-5xl font-light">→</span>
                                </button>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                                    {featuredPosts.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveSlide(idx);
                                            }}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                idx === activeSlide ? 'w-5 bg-orange-500' : 'w-2 bg-white/40 hover:bg-white/70'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    !isFirstPage ? null : (
                        <div className="relative bg-[#040a18] bg-gradient-to-r from-[#090d16] via-[#0e162b] to-[#090d16] text-white pt-36 pb-24 rounded-b-[2rem] md:rounded-b-[3rem] shadow-xl overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#f97316] to-[#facc15] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
                            
                            <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                                    Blog Insights
                                </h1>
                                <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto font-medium leading-relaxed">
                                    Explore Our Latest Articles and Industry Insights
                                </p>
                            </div>
                        </div>
                    )
                )}

                <div className="container mx-auto px-4 max-w-6xl py-16">
                    {postList.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
                            <p className="text-slate-800 text-xl font-bold">No posts found</p>
                            <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
                                Be the first to share an article by creating a new post.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {gridPosts.length > 0 && (
                                <div className="space-y-8">
                                    {featuredPosts.length > 0 && (
                                        <h3 className="text-xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
                                            Latest Articles
                                        </h3>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {gridPosts.map((post, idx) => {
                                            const design = getPostDesign(post, idx + (isFirstPage ? 1 : 0));
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
                            )}

                            {posts.last_page > 1 && (
                                <div className="flex items-center justify-center gap-3 pt-8 border-t border-slate-100">
                                    {posts.current_page == 1 ? (
                                        <span className="border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-300 cursor-not-allowed select-none bg-white inline-block w-32 text-center">
                                            Previous
                                        </span>
                                    ) : (
                                        <Link
                                            href={'/?page=' + (posts.current_page - 1)}
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
                                            href={'/?page=' + (posts.current_page + 1)}
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
            <DeleteConfirmModal
                isOpen={deletePostId !== null}
                onClose={() => setDeletePostId(null)}
                onConfirm={confirmDelete}
            />
        </Layout>
    );
}
