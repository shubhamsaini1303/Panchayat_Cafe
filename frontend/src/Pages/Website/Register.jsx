/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    };

    console.log(data);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_BASE_URL}/register`, data);
      if (response.data.status === 1) {
        navigate('/login'); // Navigate to login after successful registration
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError('There was an error registering!');
    }
  };

  return (
    <div className="h-auto mt-3 p-4 md:p-8">
      <div className="text-[22px] md:text-[25px] font-bold">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[100px]">
            <h3 className="uppercase mt-6 text-[14px] md:text-[15px]">Full Name</h3>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b-2 text-[13px] mt-2 w-full p-1"
              required
            />
          </div>
          <div className="h-[100px]">
            <h3 className="uppercase mt-6 text-[14px] md:text-[15px]">Email</h3>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 text-[13px] mt-2 w-full p-1"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[100px]">
            <h3 className="uppercase mt-6 text-[14px] md:text-[15px]">Password</h3>
            <input
              type="password"
              name="password"
              placeholder="Enter Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-b-2 text-[13px] mt-2 w-full p-1"
              required
            />
          </div>
          <div className="h-[100px]">
            <h3 className="uppercase mt-6 text-[14px] md:text-[15px]">Confirm Password</h3>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-b-2 text-[13px] mt-2 w-full p-1"
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="md:ml-[470px] w-full md:w-[300px] h-[40px] border border-blue-600 mt-4 mx-auto rounded-2xl bg-black text-white transition-all transform hover:bg-gray-800 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
