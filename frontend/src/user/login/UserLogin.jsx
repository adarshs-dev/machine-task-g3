import React, { useState } from 'react';
import { FaApple } from "react-icons/fa";
import { toast } from 'react-toastify';
import goo from '../../assets/goo.png'
import facebook from '../../assets/facebook.png'
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import axios from 'axios';
// import Navbar from '../../components/Navbar/Navbar';




const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    
    // console.log('Login attempt:', formData);
try {
  const res = await axios.post("http://localhost:5000/api/auth/login",formData);
  localStorage.setItem('token', res.data.token);
  toast.success(res.data.message || ' Login Successful',{
    theme: 'dark',
    icon: <span style={{fontSize: '18px' }}>✅</span>
  });
  navigate('/')

} catch (err) {
      toast.error(err.response?.data?.message || 'Login failed',{
        theme: 'light' ,
        icon: <span style={{fontSize: '18px' }}>❌ </span>
      });

}finally{
  setLoading(false)
}
  };

  

  return (
    <>
    <Navbar variant = 'default' />
   <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-white p-4 overflow-hidden">
        
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-blue-100 to-transparent opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-100 to-transparent opacity-30"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-lg">
        <div className="bg-gray-100 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 mb-7">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">Login</h1>
            <p className="text-gray-600 text-sm leading-relaxed px-4">
              Welcome back! Sign in using your social account or email to continue us
            </p>
          </div>

          
                       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                 {/* Social Login Buttons */}
                      <div className="flex justify-center space-x-7 mb-8">
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

        

          {/* Login Form */}
          <div className="space-y-6 mx-auto max-w-sm">
            {/* Email Input */}
            <div className='bg-white rounded-2xl p-2'>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                 className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className='bg-white rounded-2xl p-2'>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-1 py-2 text-gray-700 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Login Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={handleSubmit}
                disabled ={loading}
                className="w-52  bg-white text-black font-semibold py-3 px-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-md hover:scale-90 hover:bg-blue-700 hover:text-white text-lg"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>


            <h1 className='text-sm flex font text-gray-600 justify-center gap-1'>New to Here? <Link to={'/register'} className='text-blue-700 font-medium '>Register</Link> </h1>
          </div>

          {/* Additional Links */}
         
        </div>
      </div>
    </div>
    </>
  );
};

export default UserLogin;