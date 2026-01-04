import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const handelOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/api/lt/user/login",
                { phoneNum: phone },
                { withCredentials: true }
            );
            alert("User Logged In Successfully!");
            navigate("/allcontacts")
        } catch (error) {
            console.error("Error ❌:", error.response?.data || error);
            alert(error.response?.data?.message || "Failed to login");
        }
    }
    const [phone, setPhone] = useState('')
    const phoneId = nanoid();
    return (
        <div>
            <form onSubmit={handelOnSubmit} >
                <label htmlFor={phoneId}>Phone Number</label>
                <input
                    id={phoneId}
                    type="text"
                    placeholder='99xxxxx26'
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}

                />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
