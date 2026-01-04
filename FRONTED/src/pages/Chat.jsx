import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import SendMsg from '../components/SendMsg'
function Chat() {
  const id = useParams().id
  console.log(id)
  const [allChat,setAllChat] = useState([])
  const handelChat = (id) => {
    axios.post(`http://localhost:5000/api/lt/msg/getMsg/${id}`,
      {},
      { withCredentials: true }
    )
      .then(res => {
        console.log(res.data.message)
        setAllChat(res.data.message)
      })
      .catch(() => {
        alert("Sorry Failed to Fetch Your Info")
      })
  }
  useEffect(() => {
    handelChat(id)
  },[id])
  return (
    <div>
      {allChat.map((chat) => (
        <div key={chat._id}>
          <hr />
          <h3>{chat.message}</h3>
          <p>{chat.date}</p>
          <p>{chat.time}</p>
          <button>Update</button>
          <button>Delete</button>
        </div>
      ))}
      <hr />
        <SendMsg/>
    </div>
  )
}

export default Chat
