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
import { PenSquare, LogOut } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth.user;

    const handleLogout = () => {
        router.post('/logout');
    };

    const canCreatePost = user && (user.role === 'admin' || user.role === 'editor');

    return (
        <nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto px-4 max-w-4xl flex h-14 items-center justify-between">
                <Link href="/" className="font-bold text-lg tracking-tight">
                    Pertama Blog
                </Link>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            {canCreatePost && (
                                <Button asChild size="sm" variant="outline">
                                    <Link href="/posts/create">
                                        <PenSquare className="w-4 h-4 mr-1" />
                                        New Post
                                    </Link>
                                </Button>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <div className="px-2 py-1.5">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <div className="mt-1">
                                            <Badge variant="secondary" className="text-xs capitalize">{user.role}</Badge>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
