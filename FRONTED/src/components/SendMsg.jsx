import React, { useState } from 'react'
import Input from './Input'
import Button from './Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
function SendMsg() {
    
    const[msg,SetMsg] = useState("");
    const id = useSelector((state) => state.auth.userData._id);
    console.log(id)
    const handelSubmit = () => {
        axios.post(`http://localhost:5000/api/lt/msg/sendMsg/${id}`,
            {msg},
            { withCredentials: true }
        )
        .then(res => console.log("Msg send successfully"))
        .catct(() => {
            alert("Piz send again")
        })
    }
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Input
            type="text"
            placeholder="Enter your msg .."
            value={msg}
            onChange={(e) => (SetMsg(e.target.value))}
        />
        <Button
        type="Submit"
        >send</Button>
      </form>
    </div>
  )
}

export default SendMsg
