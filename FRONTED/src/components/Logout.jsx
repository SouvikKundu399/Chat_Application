import React from 'react'
import Button from './Button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/auth/authSlice'
function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handelLogOut = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/lt/user/logout",
            {},
            { withCredentials: true}
        )
            .then(res => {
                alert("Logout Successfully")
                dispatch(logout())
                navigate("/login")
            })
            .catch(() => {
                alert("Logout Unsuccessfully")
            })
    }
  return (
    <Button onClick={handelLogOut}>LogOut</Button>
  )
}

export default Logout
