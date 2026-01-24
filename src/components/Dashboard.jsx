import React, { useState } from 'react'; // useState add kiya
import { auth } from '../firebase';
import { FileText, Award, LogOut, Send, Loader2 } from 'lucide-react';

const Dashboard = () => {
  
  const user = auth.currentUser;
  const [projectLink, setProjectLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  // Google Sheet par project link bhejne ka function
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
      
      alert("Zabardast! Aapka project submit ho gaya hai. Hum jald check karenge.");
      setProjectLink("");
    } catch (error) {
      console.error("Error submitting project:", error);
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
      <div className="flex-1 p-8">
        
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
          
          {/* Exams Section */}
          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl">
             <h3 className="text-xl font-bold mb-6">Available Exams</h3>
             <div className="p-5 bg-gray-900/50 border border-gray-700 rounded-2xl flex justify-between items-center opacity-60">
                <span>Ethical Hacking Quiz #1</span>
                <span className="text-xs bg-gray-800 px-3 py-1 rounded">Coming Soon</span>
              </div>
          </div>

          {/* Project Submission Section (NEW ADDITION) */}
          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl border-t-4 border-t-green-500">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                    <Send size={24} />
                </div>
                <h3 className="text-xl font-bold">Submit Practical Project</h3>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="space-y-4">
               <div>
                  <label className="text-xs text-gray-500 uppercase font-bold mb-2 block">GitHub / Drive Link</label>
                  <input 
                    type="url" 
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://github.com/your-work" 
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition"
                    required
                  />
               </div>
               <button 
                 disabled={isSubmitting}
                 className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center disabled:opacity-50 shadow-lg shadow-green-900/20"
               >
                 {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send size={18} className="mr-2" />}
                 {isSubmitting ? "Uploading..." : "Submit Project"}
               </button>
            </form>
            <p className="text-[10px] text-gray-500 mt-4 italic text-center">
              Note: Project submit karne ke baad hamari team review karegi.
            </p>
          </div>

          {/* Certificates Section */}
          <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 shadow-xl lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Your Certificates</h3>
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center">
              <Award className="mx-auto text-gray-700 mb-2" size={40} />
              <p className="text-gray-500">No certificates yet. Finish your project first!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;