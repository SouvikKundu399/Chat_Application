import React, { useState } from 'react'
import Input from './Input'
import Button from './Button';
import axios from 'axios';
function SendMsg() {
    
    const[msg,SetMsg] = useState("");
    const handelSubmit = () => {
        axios.post("http://localhost:5000/api/lt/msg/sendMsg/690ba5067f86a9961483cd64",
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
