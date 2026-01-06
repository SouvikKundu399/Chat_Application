import React, { useEffect, useState } from 'react'
import Input from './Input'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshAllChat } from '../redux/auth/authSlice';
function SendMsg() {
    
  const [message, SetMessage] = useState("");
    const id = useSelector((state) => state.auth.memberData._id);
    console.log(id)
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const handelSubmit = (e) => {
      e.preventDefault()
      console.log(id)
      if (!id) {
        alert("member not found")
        return
      }
    if (!message) {
      alert("Msg not found")
      return
    }

        axios.post(`http://localhost:5000/api/lt/msg/sendMsg/${id}`,
          { message },
            { withCredentials: true }
        )
        .then(() => {
            SetMessage("")
            // navigate(`/chat/${id}`)  
            dispatch(refreshAllChat())

          })
        .catch(() => {
            alert("Piz send again")
        })
    }

  // useEffect(() => {
    
  // }, [message])
    return (
    <div>
      <form onSubmit={(e) => handelSubmit(e)}>
        <Input
            type="text"
            placeholder="Enter your msg .."
          value={message}
          onChange={(e) => (SetMessage(e.target.value))}
        />
        <button
        type="submit"
        >send</button>
      </form>
    </div>
  )
}

export default SendMsg
