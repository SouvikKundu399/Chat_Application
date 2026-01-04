import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    description: '',
    avatar: null
  });

  // ✅ Generate unique ids for labels & inputs
  const fullNameId = nanoid();
  const userNameId = nanoid();
  const emailId = nanoid();
  const phoneId = nanoid();
  const descriptionId = nanoid();
  const avatarId = nanoid();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("fullName", formData.fullName);
    data.append("userName", formData.userName);
    data.append("mail", formData.email);
    data.append("phoneNum", formData.phone);
    data.append("description", formData.description);
    data.append("avatar", formData.avatar);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/lt/user/registration",
        data,
        { withCredentials: true }
      );
      alert("User Registered Successfully!");
      navigate('/allcontacts');
    } catch (error) {
      console.error("Error ❌:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to register");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Full Name */}
      <label htmlFor={fullNameId}>Full Name</label>
      <input
        id={fullNameId}
        type="text"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />

      {/* Username */}
      <label htmlFor={userNameId}>Username</label>
      <input
        id={userNameId}
        type="text"
        placeholder="Enter your username"
        value={formData.userName}
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
      />

      {/* Email */}
      <label htmlFor={emailId}>Email</label>
      <input
        id={emailId}
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      {/* Phone */}
      <label htmlFor={phoneId}>Phone Number</label>
      <input
        id={phoneId}
        type="text"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />

      {/* Description */}
      <label htmlFor={descriptionId}>Description</label>
      <input
        id={descriptionId}
        type="text"
        placeholder="Something about you"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      {/* Avatar */}
      <label htmlFor={avatarId}>Upload Avatar</label>
      <input
        id={avatarId}
        type="file"
        accept="image/*"
        onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;