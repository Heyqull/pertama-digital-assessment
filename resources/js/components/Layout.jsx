import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {children}
            </main>
        </div>
    );
}
