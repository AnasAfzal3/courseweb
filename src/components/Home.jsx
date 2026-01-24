import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook } from 'lucide-react';
import { courses } from '../data';
import VipStudentsSection from './vipStudents';
import NotificationPopup from './NotificationPopup'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* AM Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
           
            <span className="text-xl font-bold tracking-tight sm:inline-block text-gray-100">
             <img src='images/Logo.png' width={70} alt='not found'/>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-6 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="#courses" className="hover:text-white transition">Courses</Link>
            <Link to="#" className="hover:text-white transition">Contact</Link>
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT (HERO + GRID) --- */}
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Learn With Excellence
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Apni skills ko next level par le kar jayen. Hamare premium courses join karein aur expert banien.
          </p>

          {/* Courses Grid */}
          {/* Courses Grid */}
<div id="courses" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {courses.map((course) => (
    <Link key={course.id} to={`/course/${course.id}`} className="group">
      <div className="premium-card bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 h-full flex flex-col hover:-translate-y-2">
        
        {/* Image Area */}
        <div className="h-48 overflow-hidden relative">
          {/* Price Tag Overlay */}
          <div className="absolute top-3 right-3 z-20 bg-gray-900/90 text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/5">
            {course.price}
          </div>
          
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-700 "
          />
          {/* Shine Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Content Area */}
        <div className="p-6 flex-grow flex flex-col justify-between text-left">
          <div>
            <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${course.color} group-hover:text-white`}>
              {course.title}
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {course.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-700/50 pt-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Enroll Now
            </span>
            <div className="flex items-center text-blue-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
</div>
      </main>
      {/* // vIP Students section */}
       <VipStudentsSection/>
      {/* --- FOOTER --- */}
      <footer className="bg-gray-950 border-t border-gray-800 py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-white">AM Academy</h2>
            <p className="text-gray-500 text-sm">© 2026 All Rights Reserved.</p>
          </div>

          {/* Facebook Only Icon */}
          <div className="flex items-center space-x-4">
            <p className="text-gray-400 text-sm font-medium">Follow us:</p>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600/10 p-2 rounded-full text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
        <NotificationPopup />
      </footer>
 
    </div>
    
   
  );
};

export default Home;