

import React, { useState } from 'react';
import { FaApple } from "react-icons/fa"
import { toast } from 'react-toastify';
import goo from '../../assets/goo.png'
import facebook from '../../assets/facebook.png'

import '../../App.css'
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import axios from 'axios';


const UserRegister = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
       setError("");
    setLoading(true);
    // console.log('Registration data:', formData);
    try {
      await axios.post('http://localhost:5000/api/auth/register',formData);
      toast.success(res.data?.message || 'Registration Successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false)
    }



  };


  
  return (
<>
<Navbar variant = 'default' />

  <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-100 rounded-full opacity-10"></div>
      </div>

      {/* Registration Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-gray-100 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">Register</h1>
            <p className="text-gray-800 text-sm leading-relaxed">
              Welcome ! Sign in using your social<br />
              account or email to continue us
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-7 mb-5">
            {/* Facebook */}
            <button
             onClick={() => window.open('https://www.facebook.com/')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-white transition-colors shadow-md hover:bg-gray-200"
            >
           <img src={facebook} className='w-8' alt="" />
            </button>

            {/* Google */}
            <button
              onClick={() => window.open('https://www.google.com/')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-colors shadow-md hover:bg-gray-200"
            >
              <img src={goo} className='w-6.5' alt="" />
            </button>

            {/* Apple */}
            <button
              onClick={() => window.open('https://www.apple.com/in/')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-md text-3xl"
            >
             

<FaApple/>


            </button>
          </div>

          {/* Registration Form */}
          <div className="space-y-6 mx-auto max-w-sm">


            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}


<div className=" bg-white rounded-2xl p-2 ">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className=' bg-white rounded-2xl p-2  '>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div className=' bg-white rounded-2xl p-2 '>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-52  bg-white text-gray-700 font-medium py-3 px-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-md hover:scale-90 hover:bg-blue-700 hover:text-white text-lg"
              >

                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserRegister
