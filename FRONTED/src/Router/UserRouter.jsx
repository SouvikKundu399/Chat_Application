import React from 'react'
import Login from '../pages/Login.jsx'
import Registration from '../pages/Registration.jsx'
import AllConnection from '../pages/AllConnection.jsx'
import UpdateProfile from '../pages/UpdateProfile.jsx'
import Chat from '../pages/Chat.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function UserRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/allcontacts" element={<AllConnection />} />
                <Route path="/UpdateProfile" element={<UpdateProfile />} />
                <Route path="/UpdateProfile" element={<UpdateProfile />} />
                <Route path="/chat/:id" element={<Chat />} />
                
            </Routes>
        </Router>
    )
}

export default UserRouter
