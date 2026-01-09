import React from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate("/UpdateProfile")}
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
        P
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">Profile</span>
        <span className="text-xs text-gray-500">View & edit</span>
      </div>
    </div>
  )
}

export default Profile
