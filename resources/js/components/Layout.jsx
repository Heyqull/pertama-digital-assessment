import React from 'react';
import Navbar from './Navbar';
import { usePage } from '@inertiajs/react';

export default function Layout({ children }) {
    const { component } = usePage();
    const isFullWidth = component === 'PostsPage' || component === 'ArchivePage';

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans antialiased">
            <Navbar />
            {isFullWidth ? (
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
