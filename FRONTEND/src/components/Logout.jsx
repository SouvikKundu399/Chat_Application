import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/auth/authSlice'

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await axios.post(
                "http://localhost:5000/api/lt/user/logout",
                {},
                { withCredentials: true }
            )

            dispatch(logout())
            navigate("/login")
        } catch {
            alert("Logout Unsuccessful")
        }
    }

    return (
        <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 mt-2 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 transition"
        >
            {/* Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold">
                ⎋
            </div>

            {/* Text */}
            <div className="flex flex-col">
                <span className="text-sm font-semibold">Logout</span>
                <span className="text-xs text-red-400">Sign out</span>
            </div>
        </div>
    )
}

export default Logout
