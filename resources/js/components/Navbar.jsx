import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { PenSquare, LogOut, Search } from 'lucide-react';

export default function Navbar() {
    const { auth, component } = usePage().props;
    const user = auth?.user;
    const isHome = component === 'PostsPage';

    const handleLogout = () => {
        router.post('/logout');
    };

    const canCreatePost = user && (user.role === 'admin' || user.role === 'editor');

    return (
        <nav
            className={`${
                isHome
                    ? 'absolute top-0 left-0 right-0 z-50 bg-transparent border-none'
                    : 'bg-[#090d16] border-b border-gray-800/40 sticky top-0 z-50'
            } transition-all duration-300`}
        >
            <div className="container mx-auto px-4 max-w-6xl flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
                    <span className="text-white hover:text-orange-400 font-semibold tracking-wide text-lg transition-colors">
                        Pertama Blog
                    </span>
                </Link>

                <div className="flex items-center gap-4 text-white">
                    <button className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                        <Search className="w-4.5 h-4.5" />
                    </button>

                    {user ? (
                        <>
                            {canCreatePost && (
                                <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 border-none shadow-md shadow-orange-500/10 text-xs font-semibold">
                                    <Link href="/posts/create">
                                        <PenSquare className="w-3.5 h-3.5 mr-1" />
                                        New Post
                                    </Link>
                                </Button>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 p-0 border border-white/20">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-[#0f172a] text-white border border-gray-800/80">
                                    <div className="px-2 py-1.5">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <div className="mt-1">
                                            <Badge variant="secondary" className="text-[10px] capitalize bg-slate-800 text-slate-200 border-none px-2 py-0.5">
                                                {user.role}
                                            </Badge>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator className="bg-gray-800" />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full text-xs font-medium">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 border-none shadow-md shadow-orange-500/10 text-xs font-semibold">
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
