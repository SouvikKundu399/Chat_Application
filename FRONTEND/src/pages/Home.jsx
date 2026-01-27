import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#efeae2] flex items-center justify-center px-4 sm:px-6 lg:px-8">

            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 text-center">

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-2">
                    Msg Me
                </h1>

                <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">
                    Chat with friends instantly and securely
                </p>

                {/* Buttons */}
                <div className="space-y-3 sm:space-y-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full py-2.5 sm:py-3 lg:py-3.5 rounded-xl bg-green-600 text-white font-semibold text-sm sm:text-base hover:bg-green-700 transition duration-200 shadow-md"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/registration")}
                        className="w-full py-2.5 sm:py-3 lg:py-3.5 rounded-xl border border-green-600 text-green-600 font-semibold text-sm sm:text-base hover:bg-green-50 transition duration-200"
                    >
                        Create New Account
                    </button>
                </div>

                {/* Footer */}
                <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-400">
                    © 2026 Msg Me • Secure Messaging Platform
                </p>

            </div>
        </div>
    );
}

export default Home;
