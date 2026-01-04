import React, { useState, useEffect } from 'react'
import Logout from '../components/Logout'
import Profile from '../components/Profile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [members, setMembers] = useState([])
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
  }, []) // ✅ empty dependency
  console.log(members)

  return (
    <>
    <hr />
      <Logout />
      <Profile />
      <hr />
    
      {members.map(member => (
        <div 
          onClick={() => navigate(`/chat/${member._id}`)}
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
