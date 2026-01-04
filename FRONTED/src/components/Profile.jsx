import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from './Button';
import UpdateProfile from '../pages/UpdateProfile';

function Profile() {
    const navigate = useNavigate()
  return (
    <Button
     onClick={() => navigate("/UpdateProfile")}>Profile</Button>
  )
}

export default Profile
