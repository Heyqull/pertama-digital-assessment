# Coding Challenge - Pertama Blog 🚀

A premium blogging platform built as part of a coding assessment.

---

## 1. Frontend Tech Stack

- **React**: Chosen for building a highly modular, component-based user interface. It powers the single-page dashboard application, interactive states, and client-side rendering.
- **Inertia.js**: Serves as the modern connector, allowing us to build a single-page React app using classic server-side routing and controllers. It eliminates the need for a separate SPA API, client-side routers, or custom token authorization systems.
- **Tailwind CSS**: A utility-first CSS framework used to build our custom design system, handling gradients, HSL colors, responsive grids, hover animations, and custom styling parameters.
- **Lucide React**: Provides unified, clean vector-based icons throughout the dashboard interfaces (e.g., search, edit, delete, comments).

---

## 2. Backend Tech Stack

- **Laravel (PHP)**: Used as the robust MVC framework to handle routing, authentication middleware, request validation, database models, and server-side responses.
- **SQLite Database**: A lightweight, serverless, file-based SQL database configured locally to store tables, relationships, and seed data.
- **Eloquent ORM**: Laravel's database mapper used to manage relations (User-Post, Post-Comment) and query builders with eager loading.
- **Laravel Session Auth**: Handles out-of-the-box secure session management and authentication validation.

---

## 3. Core Necessary Features

- User registration and login
- Create a new blog post
- Edit an existing blog post
- Delete a blog post
- View a list of all blog posts

---

## 4. Bonus Points

- Implement user roles (admin, editor, reader)
- Add comments to blog posts
- Implement pagination for blog posts

---

## 5. Extra Added Features

- **Dynamic Bento Hero Carousel**: An interactive, touch-friendly featured carousel slider at the top of the homepage that auto-scrolls every 3 seconds and pauses on hover.
- **All Articles Archive**: A dedicated archive page (`/articles`) listing all published posts, set to a larger layout grid of 20 items per page.
- **Scroll Reading Progress Bar**: A sleek orange reading progress bar fixed at the very top of the post details view that tracks how far a user has scrolled down the article.
- **Custom Confirmation Modal Overlays**: Designed a custom React confirmation alert warning dialog for post deletion, replacing standard browser alert popups with a polished UI matching the theme.

---

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   composer install
   npm install
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env` and configure your SQLite database:
   ```env
   DB_CONNECTION=sqlite
   ```

3. **Launch Local Server**:
   Run the backend development server:
   ```bash
   php artisan serve
   ```
   Run Vite development server:
   ```bash
   npm run dev
   ```

4. **Build Production Assets**:
   ```bash
   npm run build
   ```

---

## Test Accounts

The database seeder prepares the following default test accounts (all passwords are `password`):

- **Admin**: `admin@pertamadigital.com` (Has full access to create, edit, and delete any posts)
- **Editor**: `editor@pertamadigital.com` (Can write posts and edit their own posts)
- **Reader**: `reader@pertamadigital.com` (Can view posts and write comments)
