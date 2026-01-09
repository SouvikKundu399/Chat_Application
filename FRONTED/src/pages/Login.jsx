import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/auth/authSlice'
import { useDispatch } from "react-redux"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [phone, setPhone] = useState('')
    const phoneId = nanoid()

    const handelOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                "http://localhost:5000/api/lt/user/login",
                { phoneNum: phone },
                { withCredentials: true }
            )

            dispatch(login(res.data.data.user))
            alert("User Logged In Successfully!")
            navigate("/allcontacts")

        } catch (error) {
            console.error("Error ❌:", error.response?.data || error)
            alert(error.response?.data?.message || "Failed to login")
        }
    }

    return (
        <div className="min-h-screen bg-[#efeae2] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <h1 className="text-2xl font-bold text-green-700 mb-2 text-center">
                    Welcome Back
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Login to continue
                </p>

                {/* Form */}
                <form onSubmit={handelOnSubmit} className="space-y-5">

                    <div>
                        <label htmlFor={phoneId} className="block text-sm font-medium text-gray-600 mb-1">
                            Phone Number
                        </label>
                        <input
                            id={phoneId}
                            type="text"
                            placeholder="99xxxxx26"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition
              "
                        />
                    </div>

                    <button
                        type="submit"
                        className="
              w-full py-2.5 rounded-lg 
              bg-green-600 text-white 
              font-semibold 
              hover:bg-green-700 transition
            "
                    >
                        Login
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm mb-2">New here?</p>
                    <button
                        onClick={() => navigate("/registration")}
                        className="text-green-600 font-medium hover:underline"
                    >
                        Create an account
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Login
