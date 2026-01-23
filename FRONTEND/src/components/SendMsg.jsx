import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {socket} from '../socket'
import { useEffect } from 'react'

function SendMsg({roomId,chatId}) {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!chatId) {
      alert("Member not found")
      return
    }

    if (!message.trim()) {
      return
    }

    // axios.post(
    //   `http://localhost:5000/api/lt/msg/sendMsg/${id}`,
    //   { message },
    //   { withCredentials: true }
    // )
    //   .then(() => {

    //     setMessage("")
    //   })
    //   .catch(() => {
    //     alert("Please send again")
    //   })

    try {
        socket.emit("send-message", {
            chatId,
            message,
            roomId
        });
        setMessage("")
    } catch (error) {
        console.error('Error sending message:', error);
        alert("Failed to send message");
    }
   
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full"
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="
          flex-1 px-4 py-2.5 
          rounded-full border border-gray-300 
          focus:outline-none focus:ring-1 focus:ring-green-500
          text-sm
        "
      />

      {/* Send Button */}
      <button
        type="submit"
        className="
          px-4 py-2.5 rounded-full 
          bg-green-600 text-white 
          font-semibold text-sm
          hover:bg-green-700 transition
        "
      >
        Send
      </button>
    </form>
  )
}

export default SendMsg
