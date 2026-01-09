import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Registration() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    description: '',
    avatar: null
  })

  const fullNameId = nanoid()
  const userNameId = nanoid()
  const emailId = nanoid()
  const phoneId = nanoid()
  const descriptionId = nanoid()
  const avatarId = nanoid()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append("fullName", formData.fullName)
    data.append("userName", formData.userName)
    data.append("mail", formData.email)
    data.append("phoneNum", formData.phone)
    data.append("description", formData.description)
    data.append("avatar", formData.avatar)

    try {
      await axios.post(
        "http://localhost:5000/api/lt/user/registration",
        data,
        { withCredentials: true }
      )

      alert("User Registered Successfully!")
      navigate('/allcontacts')

    } catch (error) {
      console.error("Error ❌:", error.response?.data || error)
      alert(error.response?.data?.message || "Failed to register")
    }
  }

  return (
    <div className="min-h-screen bg-[#efeae2] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-green-700 mb-2 text-center">
          Create Account
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Register to start chatting
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label htmlFor={fullNameId} className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              id={fullNameId}
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
            <label htmlFor={userNameId} className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              id={userNameId}
              type="text"
              placeholder="Enter your username"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
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
            <label htmlFor={emailId} className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor={phoneId} className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              id={phoneId}
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            <label htmlFor={descriptionId} className="block text-sm font-medium text-gray-600 mb-1">
              About You
            </label>
            <textarea
              id={descriptionId}
              rows="3"
              placeholder="Something about you"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="
                w-full px-4 py-2.5 
                border rounded-lg 
                focus:outline-none focus:ring-1 focus:ring-green-500 
                transition resize-none
              "
            />
          </div>

          {/* Avatar */}
          <div>
            <label htmlFor={avatarId} className="block text-sm font-medium text-gray-600 mb-1">
              Upload Avatar
            </label>
            <input
              id={avatarId}
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
              className="
                w-full text-sm text-gray-600
                file:mr-3 file:py-2 file:px-4 
                file:rounded-lg file:border-0 
                file:bg-green-50 file:text-green-600 
                hover:file:bg-green-100
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-2.5 rounded-lg 
              bg-green-600 text-white 
              font-semibold 
              hover:bg-green-700 transition
            "
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </button>
        </div>

      </div>

    </div>
  )
}

export default Registration
