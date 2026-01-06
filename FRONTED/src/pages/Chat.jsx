import React, { use, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import SendMsg from '../components/SendMsg'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Chat() {
  const id = useParams().id
  console.log(id)
  const dispatch = useDispatch()
  const [allChat, setAllChat] = useState([])
  const updateAllChat = useSelector((state) => state.auth.updatemsg)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const memberName = useSelector((state) => state.auth.memberData.fullName)
  const navigate = useNavigate();

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
  }, [id, updateAllChat])
  // useEffect(() => {
  //   return () => {
  //     dispatch(leftChat())
  //   }
  // }, [])
  const handelDelete = (msgId) => {
    axios.delete(`http://localhost:5000/api/lt/msg/deleteMsg/${msgId}`,
      { withCredentials: true } 
    )
      .then(res => {
        console.log(res.data.message)
        handelChat(id)
      })
      .catch(() => {
        alert("Sorry Failed to Delete Your Msg")
      })
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
  return (
    <div>
      <h2>{memberName}</h2>
      <button
        onClick={() => navigate("/allcontacts")}
      >All Connection</button>
      {allChat.map((chat) => (
        <div key={chat._id}>
          <hr />
          {editingId === chat._id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handelUpdateSubmit(chat._id)}>Save</button>
              <button onClick={handelCancel}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{chat.message}</h3>
              <p>{chat.date}</p>
              <p>{chat.time}</p>
              <button onClick={() => handelUpdateClick(chat)}>Update</button>
              <button onClick={() => handelDelete(chat._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      <hr />
      <SendMsg />
    </div>
  )
}

export default Chat
