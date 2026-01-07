import React, { use } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
function AddNewContact() {
    const [phoneNum, setPhoneNum] = useState("");
    const navigate = useNavigate();
    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/lt/chat/addChat",
        {mobileNumber : phoneNum},
        {withCredentials: true})
        .then(res => {
            alert("Contact Added Successfully");
            navigate("/allcontacts");
        })
        .catch(() => {
            alert("Error in adding contact");
        })

    }
  return (
    <div>
      <h1>Add New Contact</h1>
      <form onSubmit={(e) => handelSubmit(e)}>
        <input
            type="text"
            placeholder='Enter phone Number'
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
        />
        <button
        type='submit'
        >Add Contact</button>

      </form>
        <button
        onClick={() => navigate("/allcontacts")}
        >All Connection</button>
    </div>
  )
}

export default AddNewContact
