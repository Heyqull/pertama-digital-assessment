import './bootstrap';
import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import ArchivePage from './pages/ArchivePage';

const pages = {
    LoginPage,
    RegisterPage,
    PostsPage,
    PostDetailPage,
    CreatePostPage,
    EditPostPage,
    ArchivePage
};

createInertiaApp({
    resolve: name => pages[name],
    
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
