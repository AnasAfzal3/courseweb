import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import CourseDetail from './components/CourseDetail';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';

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
