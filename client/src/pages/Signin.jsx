import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const nevigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send a POST request to the server with the login data
      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is OK (e.g., 200)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      // Parse the response JSON
      const data = await res.json();
      console.log('Login response:', data);
  
      // Extract the user's role from the response
      const role = data?.data?.user?.role;
  
      // Navigate based on the user's role
      if (role === 'Hospital Food Manager') {
        nevigate('/admin');
      } else if (role === 'Inner Pantry Staff') {
        nevigate('/delivery');
      } else if (role === 'Delivery Personnel') {
        nevigate('/pantry');
      } else {
        alert('Unknown role. Please contact support.');
      }
    } catch (error) {
      // Handle errors and show a message to the user
      console.error('Login error:', error);
      alert(error.message || 'An error occurred during login. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Log In
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>
         
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Log In
          </button>
        </form>
        <Link to="/sign-up"><p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button
            
            className="text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
