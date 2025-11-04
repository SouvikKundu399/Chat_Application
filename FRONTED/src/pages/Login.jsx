import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600 text-sm">Enter your phone number to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="space-y-6">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                We'll send you a verification code
                            </p>
                        </div>

                        {/* Login Button */}
                        <button
                            type="button"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition duration-200 shadow-sm hover:shadow-md"
                        >
                            Continue
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="#" className="text-teal-600 font-medium hover:text-teal-700">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-8">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}