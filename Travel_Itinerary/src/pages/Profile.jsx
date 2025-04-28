import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Get user data from sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    // Remove user data from sessionStorage on logout
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="p-8">
    

      {user ? (
        <div>
          <p className="text-xl font-semibold mb-4">Welcome back, {user.username}!</p>
          <p className="mb-4">You are logged in. Feel free to manage your travel plans.</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xl font-semibold mb-4">You are not logged in.</p>
          <p className="mb-4">Please log in or sign up to manage your profile and travel plans.</p>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
