import './App.css';
import Home from './components/Home';
import CourseDetail from './components/CourseDetail';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
