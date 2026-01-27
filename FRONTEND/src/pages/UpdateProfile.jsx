import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function UpdateProfile() {
  const [detail, setDetail] = useState({})
  const navigate = useNavigate()
  const Base_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    handleProfile()
  }, [])

  const handleProfile = () => {
    axios.get(`${Base_URL}/user/getUser`, {
      withCredentials: true
    })
      .then(res => {
        setDetail(res.data.data.user)
      })
      .catch(() => {
        alert("Sorry Failed to Fetch Your Info")
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put(
      `${Base_URL}/user/update`,
      detail,
      { withCredentials: true }
    )
      .then(() => {
        alert("Profile Updated Successfully")
        navigate("/allcontacts")
      })
      .catch(() => {
        alert("Sorry Failed to Update Your Info")
      })
  }

  return (
    <div className="min-h-screen bg-[#efeae2] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-700">Update Profile</h1>
          <button
            onClick={() => navigate("/allcontacts")}
            className="text-green-600 font-medium hover:underline"
          >
            All Contacts
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={detail.fullName || ""}
              onChange={(e) => setDetail({ ...detail, fullName: e.target.value })}
              className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
              value={detail.mail || ""}
              onChange={(e) => setDetail({ ...detail, mail: e.target.value })}
              className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition
              "
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={detail.userName || ""}
              onChange={(e) => setDetail({ ...detail, userName: e.target.value })}
              className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              About You
            </label>
            <textarea
              rows="3"
              value={detail.description || ""}
              onChange={(e) => setDetail({ ...detail, description: e.target.value })}
              className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition resize-none
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-2.5 mt-2 rounded-lg 
              bg-green-600 text-white 
              font-semibold 
              hover:bg-green-700 transition
            "
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  )
}

export default UpdateProfile
