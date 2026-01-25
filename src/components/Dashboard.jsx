import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // db import lazmi hai
import { doc, onSnapshot } from "firebase/firestore";
import { FileText, Award, LogOut, Send, Loader2, PlayCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate(); // Ye line add karen

  const user = auth.currentUser;
  const [projectLink, setProjectLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Access check karne ke liye

  // Real-time access check logic
  useEffect(() => {
    if (user?.email) {
      const unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.exists()) {
          setEnrolledCourses(doc.data().enrolledCourses || []);
        }
      });
      return () => unsub();
    }
  }, [user?.email]);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyRV5Ojvi74pSn8MZG1mOljidAxmfA3Vw1MzWfoe5ei1shGU_FJJfjVVYXT9AkuT3wSwQ/exec';

    try {
      const formData = new FormData();
      formData.append('studentName', user?.displayName);
      formData.append('studentEmail', user?.email);
      formData.append('projectLink', projectLink);
      formData.append('submissionDate', new Date().toLocaleString());

      await fetch(scriptURL, { method: 'POST', body: formData });
      alert("Zabardast! Aapka project submit ho gaya hai.");
      setProjectLink("");
    } catch (error) {
      alert("Masla hua hai! Dobara koshish karein.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      
      {/* --- Sidebar --- */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 hidden md:block p-6">
        <div className="flex items-center space-x-3 mb-10">
           <img src='images/logo.png' width={50} alt='logo'/>
        </div>

        <nav className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-xl cursor-pointer">
            <FileText size={20} />
            <span className="font-medium">My Exams</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 text-gray-400 hover:bg-gray-700/50 rounded-xl cursor-pointer transition">
            <Award size={20} />
            <span>Certificates</span>
          </div>

          <div onClick={handleLogout} className="flex items-center space-x-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl cursor-pointer transition mt-20 border border-transparent hover:border-red-400/20">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </nav>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex justify-between items-center mb-10 bg-gray-800/40 p-6 rounded-3xl border border-gray-700/50">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.displayName?.split(' ')[0] || 'Student'}! 👋</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your progress and submissions here.</p>
          </div>
          <img src={user?.photoURL} alt="Profile" className="w-14 h-14 rounded-2xl border-2 border-blue-500 shadow-lg shadow-blue-500/20" />
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl">
             <h3 className="text-xl font-bold mb-6">Available Exams</h3>
             <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-2xl flex justify-between items-center opacity-60">
                <span>Ethical Hacking Quiz #1</span>
                <span className="text-xs bg-gray-800 px-3 py-1 rounded">Coming Soon</span>
              </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl border-t-4 border-t-green-500">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                    <Send size={24} />
                </div>
                <h3 className="text-xl font-bold">Submit Practical Project</h3>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="space-y-4">
               <input 
                 type="url" value={projectLink} onChange={(e) => setProjectLink(e.target.value)}
                 placeholder="https://github.com/your-work" 
                 className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition"
                 required
               />
               <button disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center shadow-lg">
                 {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Submit Project"}
               </button>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Your Certificates</h3>
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center">
              <Award className="mx-auto text-gray-700 mb-2" size={40} />
              <p className="text-gray-500 text-sm">No certificates yet. Finish your project first!</p>
            </div>
          </div>

          {/* --- Premium Recorded Courses Section --- */}
<div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl lg:col-span-2 mt-4">
  <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
          <PlayCircle size={24} />
      </div>
      <h3 className="text-xl font-bold italic underline">Available Recorded Courses</h3>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {[
      { title: "Ethical Hacking", img: "images/image1.png", desc: "Learn penetration testing.", price: "10,000" },
      { title: "Full Stack Developer", img: "images/image2.png", desc: "Master MERN stack.", price: "6,500" },
      { title: "Python For Beginners", img: "images/image3.png", desc: "Start coding journey.", price: "3,000" },
     
    ].map((course, index) => {
      const hasAccess = enrolledCourses.includes(course.title);
      return (
        <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-2xl p-5 hover:border-blue-500 transition group flex flex-col justify-between">
          <div>
            <div className="h-32 bg-gray-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-gray-700">
               <img src={course.img} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition duration-500"/>
            </div>
            <h4 className="font-bold text-lg mb-1 italic">{course.title}</h4>
            <p className="text-gray-400 text-[11px] mb-4">{course.desc}</p>
          </div>

          <div className="mt-auto">
            {hasAccess ? (
              /* --- UPDATED BUTTON WITH NAVIGATE LOGIC --- */
              <button 
                onClick={() => {
                  const slug = course.title.toLowerCase().replace(/\s+/g, '-');
                  navigate(`/course-viewer/${slug}`);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center animate-pulse"
              >
                <PlayCircle size={18} className="mr-2" /> Watch Lectures
              </button>
            ) : (
              <>
                <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-3 mb-4">
                  <p className="text-[10px] text-blue-400 font-bold italic mb-1 uppercase tracking-tight">Fee: PKR {course.price}/-</p>
                  <p className="text-[10px] font-mono text-gray-400 italic">Meezan Bank:00300113833636 (Muhammad Anas)</p>
                </div>
                <a 
                  href={`https://wa.me/923220274707?text=Sir, I paid for ${course.title}.`} 
                  target="_blank" rel="noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 rounded-lg transition flex items-center justify-center"
                >
                  <CreditCard size={14} className="mr-2" /> Buy via WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      )
    })}
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;