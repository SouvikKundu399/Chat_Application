import React, { useState, useEffect } from 'react'
import Logout from '../components/Logout'
import Profile from '../components/Profile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { currentChat } from '../redux/auth/authSlice'

function Home() {
  const [members, setMembers] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:5000/api/lt/chat/getAllConnections",
      { withCredentials: true }
    )
      .then(res => {
        setMembers(res.data.data) // ✅ Correct path
      })
      .catch(() => {
        alert("Loading Problem")
      })
  }, [])
  console.log(members)
  const handelClick = (member) => {
    dispatch(currentChat(member))
    navigate(`/chat/${member._id}`)
  }

  return (
    <>
    <hr />
      <Logout />
      <Profile />
      <button
      onClick={() => navigate("/addNewContact")}
      >Add New Contact</button>
      <hr />
    
      {members.map(member => (
        <div 
          onClick={() => handelClick(member)}
        key={member._id}>
          <h1>{member.fullName}</h1>
          <h3>{member.phoneNum}</h3>
          <hr />
        </div>
      ))}
      
    </>
  )
}

export default Home
