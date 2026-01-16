import React, { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {socket} from '../socket'

function SendMsg({roomId}) {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  const id = useSelector((state) => state.auth.memberData._id)
  const currentuserID = useSelector((state) => state.auth.userData._id)


  const handleSubmit = (e) => {
    e.preventDefault()

    if (!id) {
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

    socket.emit("send-message", {
      currentuserID,
      contactId: id,
      message: message,
      roomId
    });
    setMessage("")
   
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
