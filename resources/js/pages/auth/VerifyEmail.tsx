import React from 'react';
import { usePage, Head } from '@inertiajs/react';

export default function VerifyEmail() {
    const { props } = usePage();
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head title="Verify Your Email" />
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Verify Your Email Address
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please verify your email address by clicking on the link we just emailed to you.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    
                    {props.flash?.success && (
                        <div className="mb-4 text-green-600">
                            {props.flash.success}
                        </div>
                    )}
                    
                    <p className="mb-4">
                        Before proceeding, please check your email for a verification link.
                        If you did not receive the email,
                    </p>
                    
                    <form method="POST" action={route('verification.send')} className="inline">
                        <button
                            type="submit"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            click here to request another
                        </button>.
                    </form>
                </div>
            </div>
        </div>
    );
}