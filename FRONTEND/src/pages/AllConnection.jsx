import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { currentChat } from '../redux/auth/authSlice'
import Logout from '../components/Logout'
import Profile from '../components/Profile'
import { socket } from '../socket'

function Home() {
  const [members, setMembers] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Base_URL = import.meta.env.VITE_BACKEND_URL

  // ===== FETCH CONNECTIONS =====
  useEffect(() => {
    axios.get(`${Base_URL}/chat/getAllConnections`, {
      withCredentials: true
    })
      .then(res => setMembers(res.data.data))
      .catch(() => alert("Loading Problem"))
  }, [])

  // ===== CLICK CONTACT =====
  const handleClick = (connection) => {
    dispatch(currentChat(connection))    
    navigate(`/chat/${connection.chatId}`)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">

      {/* ================= MOBILE VIEW ================= */}
      <div className="lg:hidden relative">

        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur shadow z-50 flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-green-700 tracking-wide">
            Chat App
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl hover:scale-110 transition"
          >
            ☰
          </button>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          />
        )}

        {/* Drawer Sidebar */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            flex flex-col px-6 py-6
          `}
        >
          <div>
            <div className="mb-8">
              <Profile />
            </div>

            <button
              onClick={() => {
                navigate("/addNewContact")
                setSidebarOpen(false)
              }}
              className="
                w-full py-3 rounded-xl
                bg-linear-to-r from-green-600 to-green-500
                text-white font-semibold
                hover:from-green-700 hover:to-green-600
                transition
              "
            >
              + Add New Contact
            </button>
          </div>

          <div className="mt-auto pt-6 border-t">
            <Logout />
          </div>
        </aside>

        {/* Content */}
        <main className="pt-16 px-4 pb-6">
          <h2 className="text-xl font-semibold mb-4">Your Contacts</h2>

          <div className="space-y-4">
            {members.map((connection) => (
              <div
                key={connection.chatId}
                onClick={() => handleClick(connection)}
                className="
                  bg-white rounded-xl p-4 shadow
                  flex items-center gap-4 cursor-pointer
                  hover:shadow-xl hover:-translate-y-1
                  transition
                "
              >
                <div className="
                  w-10 h-10 rounded-full
                  bg-linear-to-br from-green-100 to-green-200
                  text-green-700
                  flex items-center justify-center
                  font-bold
                ">
                  {connection.user.fullName?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {connection.user.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {connection.user.phoneNum}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden lg:flex min-h-screen">

        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r shadow-lg flex flex-col px-6 py-8">
          <h1 className="text-2xl font-bold mb-10 text-green-700 tracking-wide">
            Chat App
          </h1>

          <Profile />

          <button
            onClick={() => navigate("/addNewContact")}
            className="
              mt-6 w-full py-3 rounded-xl
              bg-linear-to-r from-green-600 to-green-500
              text-white font-semibold
              hover:from-green-700 hover:to-green-600
              transition
            "
          >
            + Add New Contact
          </button>

          <div className="mt-auto pt-6 border-t">
            <Logout />
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 bg-gray-50 p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Your Contacts
          </h2>

          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-8">
            {members.map((connection) => (
              <div
                key={connection.chatId}
                onClick={() => handleClick(connection)}
                className="
                  bg-white rounded-2xl p-6 shadow
                  cursor-pointer
                  hover:shadow-2xl hover:-translate-y-1
                  transition
                "
              >
                <div className="flex items-center gap-5">
                  <div className="
                    w-14 h-14 rounded-full
                    bg-linear-to-br from-green-100 to-green-200
                    text-green-700
                    flex items-center justify-center
                    text-xl font-bold
                  ">
                    {connection.user.fullName?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {connection.user.fullName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {connection.user.phoneNum}
                    </p>
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
