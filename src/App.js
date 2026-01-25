import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Home from './components/Home';
import CourseDetail from './components/CourseDetail';
import Contact from './components/Contact';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Verify from './components/Verify';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cverify" element={<Verify />} />

        {/* Protected Routes (Ab ye Routes ke andar hai) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Optional: Agar koi ghalat URL likhe to 404 ya Home par bhejne ke liye */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;