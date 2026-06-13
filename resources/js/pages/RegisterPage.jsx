import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function RegisterPage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const errorList = Object.values(errors);

    return (
        <Layout>
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="w-full max-w-sm border rounded-lg p-6 bg-white shadow-sm">
                    <h2 className="text-2xl font-bold mb-2">Register</h2>
                    <p className="text-sm text-gray-500 mb-6">Create a new account. New users get the Reader role by default.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errorList.length > 0 && (
                            <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2 space-y-1">
                                {errorList.map((err, i) => (
                                    <p key={i}>{err}</p>
                                ))}
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium block mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Min. 8 characters"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                required
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-black text-white rounded py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                        >
                            {processing ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="text-black underline">Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
