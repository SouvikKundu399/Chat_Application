import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { currentChat } from '../redux/auth/authSlice'
import Logout from '../components/Logout'
import Profile from '../components/Profile'

function Home() {
  const [members, setMembers] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/api/lt/chat/getAllConnections", {
      withCredentials: true
    })
      .then(res => setMembers(res.data.data))
      .catch(() => alert("Loading Problem"))
  }, [])

  const handleClick = (member) => {
    dispatch(currentChat(member))
    navigate(`/chat/${member._id}`)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= MOBILE VIEW ================= */}
      <div className="lg:hidden relative">

        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-green-700">Chat App</h1>
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">☰</button>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}

        {/* Drawer Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col px-6 py-6
          `}
        >
          <div>
            <div className="mb-8" onClick={() => setSidebarOpen(false)}>
              <Profile />
            </div>

            <button
              onClick={() => {
                navigate("/addNewContact")
                setSidebarOpen(false)
              }}
              className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              + Add New Contact
            </button>
          </div>

          <div className="mt-auto pt-6 border-t" onClick={() => setSidebarOpen(false)}>
            <Logout />
          </div>
        </aside>

        {/* Content */}
        <main className="pt-16 px-4 pb-6">
          <h2 className="text-xl font-semibold mb-4">Your Contacts</h2>

          <div className="space-y-4">
            {members.map(member => (
              <div
                key={member._id}
                onClick={() => handleClick(member)}
                className="bg-white rounded-xl p-4 shadow flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                  {member.fullName?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold">{member.fullName}</p>
                  <p className="text-sm text-gray-500">{member.phoneNum}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ================= LAPTOP VIEW ================= */}
      <div className="hidden lg:flex min-h-screen">

        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r flex flex-col px-6 py-8">
          <h1 className="text-2xl font-bold mb-10 text-green-700">Chat App</h1>

          <Profile />

          <button
            onClick={() => navigate("/addNewContact")}
            className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            + Add New Contact
          </button>

          <div className="mt-auto pt-6 border-t">
            <Logout />
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 bg-gray-50 p-10">

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Your Contacts</h2>
            <p className="text-gray-500 mt-1">Start a conversation</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-8">
            {members.map(member => (
              <div
                key={member._id}
                onClick={() => handleClick(member)}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-2xl transition cursor-pointer hover:-translate-y-1"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl font-bold">
                    {member.fullName?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-lg font-semibold">{member.fullName}</p>
                    <p className="text-sm text-gray-500">{member.phoneNum}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home
