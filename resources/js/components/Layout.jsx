import React from 'react';
import Navbar from './Navbar';
import { usePage } from '@inertiajs/react';

export default function Layout({ children }) {
    const { component } = usePage();
    const isHome = component === 'PostsPage';

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased pb-16">
            <Navbar />
            {isHome ? (
                <main>
                    {children}
                </main>
            ) : (
                <main className="container mx-auto px-4 py-12 max-w-4xl">
                    {children}
                </main>
            )}
        </div>
    );
}
