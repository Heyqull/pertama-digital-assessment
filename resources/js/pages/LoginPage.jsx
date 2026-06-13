import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function LoginPage() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-[75vh] bg-[#f8fafc]">
                <div className="w-full max-w-md border border-slate-100 rounded-3xl p-8 md:p-10 bg-white shadow-sm">
                    <div className="flex flex-col items-center mb-8">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f97316] to-[#facc15] shadow-lg shadow-orange-500/20 mb-3">
                            <span className="h-3.5 w-3.5 rounded-full bg-white animate-pulse" />
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
                        <p className="text-xs text-slate-400 font-semibold mt-1">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {errors.email && (
                            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-2xl px-4 py-2.5 font-semibold">
                                {errors.email}
                            </p>
                        )}
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-slate-50 placeholder-slate-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                required
                                className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all bg-slate-50 placeholder-slate-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 text-sm font-bold shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all disabled:opacity-50 mt-2"
                        >
                            {processing ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-xs text-slate-400 text-center mt-6 font-semibold">
                        Don't have an account yet?{' '}
                        <Link href="/register" className="text-orange-500 hover:underline font-bold ml-1">Register here</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
