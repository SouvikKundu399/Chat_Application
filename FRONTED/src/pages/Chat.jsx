import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import SendMsg from '../components/SendMsg'
import { useSelector } from 'react-redux'

function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [allChat, setAllChat] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  const updateAllChat = useSelector((state) => state.auth.updatemsg)
  const memberName = useSelector((state) => state.auth.memberData.fullName)
  const currentUserId = useSelector((state) => state.auth.userData._id)

  const handelChat = (id) => {
    axios.post(
      `http://localhost:5000/api/lt/msg/getMsg/${id}`,
      {},
      { withCredentials: true }
    )
      .then(res => setAllChat(res.data.message))
      .catch(() => alert("Sorry Failed to Fetch Your Info"))
  }

  useEffect(() => {
    handelChat(id)
  }, [id, updateAllChat])

  const handelDelete = (msgId) => {
    axios.delete(
      `http://localhost:5000/api/lt/msg/deleteMsg/${msgId}`,
      { withCredentials: true }
    )
      .then(() => handelChat(id))
      .catch(() => alert("Sorry Failed to Delete Your Msg"))
  }

  const handelUpdateClick = (chat) => {
    setEditingId(chat._id)
    setEditText(chat.message)
  }

  const handelUpdateSubmit = (msgId) => {
    if (!editText.trim()) return

    axios.put(
      `http://localhost:5000/api/lt/msg/editMsg/${msgId}`,
      { newMsg: editText },
      { withCredentials: true }
    )
      .then(() => {
        setEditingId(null)
        setEditText("")
        handelChat(id)
      })
      .catch(() => alert("Sorry Failed to Update Your Msg"))
  }

  const handelCancel = () => {
    setEditingId(null)
    setEditText("")
  }

  // ===== DATE UTIL =====
  const formatDateLabel = (dateStr) => {
    const msgDate = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    if (msgDate.toDateString() === today.toDateString()) return "Today"
    if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday"

    return msgDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  return (
    <div className="h-screen w-full flex flex-col bg-[#efeae2]">

      {/* ================= HEADER ================= */}
      <div className="w-full bg-white border-b px-3 py-2 flex items-center gap-3">
        <button
          onClick={() => navigate("/allcontacts")}
          className="text-xl text-gray-600"
        >
          ←
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
          {memberName?.charAt(0)}
        </div>

        <h2 className="text-base lg:text-lg font-semibold text-gray-900 tracking-wide truncate">
          {memberName}
        </h2>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 w-full overflow-y-auto px-3 py-3 space-y-2">

        {allChat.map((chat, index) => {
          const isMe = chat.senderId === currentUserId
          const currentDate = chat.date
          const prevDate = index > 0 ? allChat[index - 1].date : null
          const showDateSeparator = currentDate !== prevDate

          return (
            <React.Fragment key={chat._id}>

              {/* ===== DATE SEPARATOR ===== */}
              {showDateSeparator && (
                <div className="w-full flex justify-center my-3">
                  <span className="px-3 py-1 rounded-full bg-white text-xs text-gray-600 shadow">
                    {formatDateLabel(currentDate)}
                  </span>
                </div>
              )}

              {/* ===== MESSAGE ROW ===== */}
              <div className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`
                    max-w-[90%] lg:max-w-[45%] px-3 py-2 shadow
                    ${isMe
                      ? "bg-[#dcf8c6] text-gray-900 rounded-2xl rounded-br-sm"
                      : "bg-[#e7f3ff] text-gray-900 rounded-2xl rounded-bl-sm"
                    }
                  `}
                >
                  {editingId === chat._id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border focus:outline-none text-sm lg:text-base"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handelUpdateSubmit(chat._id)}
                          className="text-xs lg:text-sm px-3 py-1.5 rounded bg-green-600 text-white"
                        >
                          Save
                        </button>
                        <button
                          onClick={handelCancel}
                          className="text-xs lg:text-sm px-3 py-1.5 rounded bg-gray-200 text-gray-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* ================= MOBILE LAYOUT ================= */}
                      <div className="lg:hidden">
                        <p className="text-sm leading-relaxed wrap-break-words">
                          {chat.message}
                        </p>

                        <div className="flex justify-end items-center gap-3 mt-1 text-[10px] text-gray-600">
                          <span className="text-gray-500">{chat.time}</span>

                          {isMe && (
                            <>
                              <button
                                onClick={() => handelUpdateClick(chat)}
                                className="hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handelDelete(chat._id)}
                                className="hover:underline"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* ================= DESKTOP LAYOUT ================= */}
                      <div className="hidden lg:flex items-center gap-3 whitespace-nowrap overflow-hidden">
                        <span className="text-base tracking-wide truncate max-w-[55%]">
                          {chat.message}
                        </span>

                        <span className="text-xs text-gray-500 shrink-0">
                          {chat.time}
                        </span>

                        {isMe && (
                          <div className="flex gap-2 text-xs text-gray-600 shrink-0">
                            <button
                              onClick={() => handelUpdateClick(chat)}
                              className="hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handelDelete(chat._id)}
                              className="hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

            </React.Fragment>
          )
        })}

      </div>

      {/* ================= INPUT BAR ================= */}
      <div className="w-full bg-white px-2 py-2 border-t">
        <SendMsg />
      </div>

    </div>
  )
}

export default Chat
