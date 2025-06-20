import React, { useState } from 'react';
import axios from 'axios';
import Loginjpg from '../assets/login.jpg'; // Make sure you have a login image too!
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      alert('Login successful!');
      navigate('/quiz');
    } catch (err) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='flex justify-between h-screen'>
      <div className='p-2 pl-3 h-screen pr-0 rounded-lg shadow-2xl hidden md:block'>
        <img className='rounded-lg h-screen  shadow-2xl' src={Loginjpg} alt="img" />
      </div>
      <div className="max-w-md mx-auto my-40 p-6 flex flex-col justify-around">
        <div>
          <h1 className="text-2xl text-center font-bold mb-1">Welcome Back to Jobby</h1>
          <h4 className='text-gray-600 italic text-center text-base'>Login to discover your personalized job recommendations</h4>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full border p-2 rounded-xl"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full border p-2 rounded-xl"
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="bg-green-600 text-white px-4 py-2 w-full border p-2 rounded-xl" type="submit">
              Login
            </button>
          </form>
          <div className="my-4 flex items-center justify-center">
            <button
              type="button"
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 w-full justify-center"
              onClick={() => alert('Implement Google login logic here')}
            >
              <FcGoogle size={24} />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
