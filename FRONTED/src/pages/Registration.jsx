import React from 'react';
import { User, Mail, Phone, FileText, Upload } from 'lucide-react';

export default function RegistrationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create Account</h1>
                    <p className="text-gray-600 text-sm">Join us and get started today</p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400 font-medium">@</span>
                                </div>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="Choose a username"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

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
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    rows="4"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                        </div>

                        {/* Profile Picture Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Picture
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition cursor-pointer">
                                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="text-teal-600 font-medium">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG or JPEG (max. 5MB)</p>
                                <input type="file" className="hidden" accept="image/*" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition duration-200 shadow-sm hover:shadow-md"
                        >
                            Create Account
                        </button>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-teal-600 font-medium hover:text-teal-700">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}