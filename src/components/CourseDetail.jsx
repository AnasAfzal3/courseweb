import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, BookOpen, Star, CheckCircle } from 'lucide-react';
import { courses } from '../data';
import EnrollmentModal from './EnrollmentModal'
import { useState } from 'react';
const CourseDetail = () => {
  
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  // Find the specific course based on URL ID
  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Course Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Back Navigation */}
      <nav className="p-6 container mx-auto">
        <Link to="/" className="text-gray-400 hover:text-white flex items-center transition-colors">
          &larr; Back to Home
        </Link>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
          
          {/* Banner */}
          <div className="relative h-64 md:h-96">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-800/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl md:text-6xl font-black mb-2">{course.title}</h1>
              <div className="flex items-center space-x-4 text-sm font-medium">
                 <span className="flex items-center text-yellow-400"><Star size={16} className="mr-1 fill-current"/> 4.9</span>
                 <span className="text-gray-400">|</span>
                 <span className="text-gray-300">Advanced Level</span>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left Side: Overview */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <BookOpen className="mr-3 text-blue-500" /> Course Overview
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {course.overview}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="mr-3 text-green-500" /> What You'll Learn
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-400">
                        <span className="text-green-500 mr-2">✔</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: Sidebar Info */}
            {/* Right Side: Dynamic Sidebar Info */}
<div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 h-fit">
  <h3 className="text-xl font-bold mb-6">Course Details</h3>
  <div className="space-y-4">
    
    {/* Dynamic Duration */}
    <div className="flex justify-between border-b border-gray-800 pb-2">
      <span className="text-gray-500">Duration</span>
      <span className="text-gray-200">{course.duration}</span>
    </div>

    {/* Dynamic Price */}
    <div className="flex justify-between border-b border-gray-800 pb-2">
      <span className="text-gray-500">Price</span>
      <span className="text-green-400 font-bold">{course.price}</span>
    </div>

    {/* Dynamic Certificate Status */}
    <div className="flex justify-between border-b border-gray-800 pb-2">
      <span className="text-gray-500">Certificate</span>
      <span className="text-gray-200">{course.hasCertificate}</span>
    </div>

    
  </div>
<div className=" ">
      {/* Sidebar Button ko update karein */}
      <button 
        onClick={() => setIsModalOpen(true)} // Click par modal khulega
        className="w-full mt-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Enroll Now
      </button>

      {/* Modal Component Call */}
      <EnrollmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedCourse={course?.title} 
      />
    </div>
  
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;