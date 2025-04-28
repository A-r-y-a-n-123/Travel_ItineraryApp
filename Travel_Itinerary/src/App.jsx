import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainDashboard from './pages/MainDashboard';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';

import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/Signup';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
};

export default App;
