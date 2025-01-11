import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:""
  });
  const [roles, setRoles] = useState([
        "Hospital Food Manager",
        "Inner Pantry Staff",
        "Delivery Personnel",
      ]);
const navigate=useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRole = () => {
    const newRole = prompt("Enter a new role:");
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
    } else {
      alert("Role already exists or input is empty!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Send a POST request to the server with the form data
      const res = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData as a JSON string
      });
  
      // Check if the response status is OK (e.g., 200 or 201)
      if (!res.ok) {
        // Parse the error message returned by the server
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to register');
      }
  
      // Parse the response JSON
      const data = await res.json();
  
      // Log data for debugging (optional)
      console.log('Registration successful:', data);
  
      // Navigate to the sign-in page
      navigate('/sign-in');
    } catch (error) {
      // Handle errors and show an alert or error message to the user
      console.error('Registration error:', error);
      alert(error.message || 'An error occurred while registering. Please try again.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>  
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
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
               name="role"
               value={formData.role}
               onChange={handleChange}
               className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
               required
              >
              <option value="">-- Select Role --</option>
              {roles.map((role, index) => (
               <option key={index} value={role}>
                 {role}
               </option>
               ))} 
            </select>

          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={handleAddRole}
          className="w-full px-4 py-2 mt-4 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-100"
        >
          Add New Role
        </button>
        <Link to="/sign-in">
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            className="text-indigo-600 hover:underline"
          >
            Log In
          </button>
          
        </p></Link>
      </div>
    </div>
  );
};

export default SignUp;
