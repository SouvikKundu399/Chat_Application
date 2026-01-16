import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddNewContact() {
  const [phoneNum, setPhoneNum] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(
      "http://localhost:5000/api/lt/chat/addChat",
      { mobileNumber: phoneNum },
      { withCredentials: true }
    )
      .then(() => {
        alert("Contact Added Successfully")
        navigate("/allcontacts")
      })
      .catch(() => {
        alert("Error in adding contact")
      })
  }

  return (
    <div className="min-h-screen bg-[#efeae2] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Add New Contact
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
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
            Add Contact
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => navigate("/allcontacts")}
          className="
            w-full mt-4 py-2.5 rounded-lg 
            border border-gray-300 
            text-gray-700 font-medium 
            hover:bg-gray-100 transition
          "
        >
          View All Contacts
        </button>

      </div>

    </div>
  )
}

export default AddNewContact
