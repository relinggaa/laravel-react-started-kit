import React from 'react';
import { useForm, Head,usePage } from '@inertiajs/react';

type FlashProps = {
    success?: string;
};

export default function UserRegister() {
    const { flash } = usePage<{ flash?: FlashProps }>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('user.register.submit'));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="User Registration" />
                    {flash && flash.success && (
                    <div className="rounded-md bg-green-50 p-4 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {flash.success}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Daftar Akun untuk memulai
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('username', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('phone', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength={8}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength={8}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Registering...' : 'Register'}
                            </button>

                            <a href={route('user.login')} className="text-blue-600 hover:text-blue-800">
                                Already registered?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}