import React, { useState } from 'react';
import axios from 'axios';
import Registerjpg from '../assets/register.jpg';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';


export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users/register', form);
    alert('Registered! Please login.');
    navigate('/login');
  };

  return (
    <div className='flex justify-between h-full '>
        <div className='h-full p-2 pr-0 pb-0 rounded-lg hidden md:block'>
            <img className='rounded-lg shadow-2xl' src={Registerjpg} alt="img" />
        </div>
    <div className="max-w-md mx-auto my-20 p-6 flex flex-col justify-around">
        <div>
      <h1 className="text-2xl text-center font-bold mb-1">Welcome to Jobby</h1>
      <h4 className='text-gray-600 italic text-center text-base pb-3'>Discover your perfect career path with smart, AI-driven guidance</h4>
      </div>
      <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2 rounded-xl" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2 rounded-xl" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded-xl" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2 w-full border p-2 rounded-xl" type="submit">Register</button>
      </form>
      <div className="my-4 flex items-center justify-center">
    <button 
      type="button"
      className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 w-full justify-center"
      onClick={() => alert('Implement Google login logic here')}
    >
      <FcGoogle size={24} /> 
      <span>Sign up with Google</span>
    </button>
  </div>
      </div>
    </div>
    </div>
  );
}
