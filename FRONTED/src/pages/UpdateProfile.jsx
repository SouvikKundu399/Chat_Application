import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
function UpdateProfile() {
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    handelProfile()
  }, [])

  const handelProfile = async (e) => {
    await axios.get("http://localhost:5000/api/lt/user/getUser",
      { withCredentials: true }
    )
      .then(res => {
        setDetail(res.data.data.user);

        // console.log(res.data.data.user)
      })
      .catch(() => {
        alert("Sorry Failed to Fetch Your Info")
      })
  } 
  return (
    <div>
      <h2>Update Profile</h2>
      <p>Fullname: {detail.fullName}</p>
      <p>Username: {detail.userName}</p>
      <p>Description: {detail.description}</p>
      <p>Email: {detail.mail}</p>
      <p>Phone: {detail.phoneNum}</p>
    </div>
  )
}

export default UpdateProfile
