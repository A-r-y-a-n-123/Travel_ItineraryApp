import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const onboardingComplete = sessionStorage.getItem('hasCompletedOnboarding');
  
    if (!onboardingComplete) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };
  

  return (
    <div className="bg-blue-600 text-white p-5">
      <nav className="flex items-center justify-between">
        <img src="/vite.svg" alt="Logo" className="h-8" />
        <div className="flex gap-7">
          <button
            onClick={handleHomeClick}
            className="text-white hover:text-gray-200"
          >
            Home
          </button>
          <Link to="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200">
            Profile
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
