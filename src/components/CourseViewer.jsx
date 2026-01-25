import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { Play, ArrowLeft, ShieldCheck } from 'lucide-react';

const CourseViewer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;
  
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState("");

  // --- Course Data (Apni YouTube IDs yahan badal len) ---
  const courseData = {
    "ethical-hacking": [
      { id: "1", title: "Introduction to Hacking", videoId: "C-hEu-xHbCo" },
      { id: "2", title: "Footprinting & Reconnaissance", videoId: "7O4ZIsW6K80" },
    ],
    "react-js": [
      { id: "1", title: "React Components", videoId: "bMknfKXIFA8" },
      { id: "2", title: "State & Props", videoId: "LdbQqXOnS6E" },
    ]
  };

  const currentVideos = courseData[courseId] || [];

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) { navigate('/'); return; }
      const docRef = doc(db, "users", user.email);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const enrolled = docSnap.data().enrolledCourses || [];
        const formattedCourseId = courseId.replace(/-/g, ' ').toLowerCase();
        const isPaid = enrolled.some(c => c.toLowerCase() === formattedCourseId);
        
        if (isPaid) {
          setHasAccess(true);
          setActiveVideo(currentVideos[0]?.videoId);
        } else {
          navigate('/dashboard');
        }
      }
      setLoading(false);
    };
    checkAccess();
  }, [user, courseId, navigate]);

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-blue-400 italic animate-pulse">Verifying Secure Access...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      
      {/* Header */}
      <div className="p-4 bg-gray-900/50 border-b border-gray-800 flex items-center justify-between backdrop-blur-md">
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-400 hover:text-white transition group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition" /> Back
        </button>
        <div className="flex items-center space-x-2">
            <ShieldCheck size={18} className="text-green-500" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-300">{courseId.replace(/-/g, ' ')}</h2>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Main Video Player Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center group">
          
          {/* --- SECURITY OVERLAYS --- */}
          {/* Top Overlay: Share aur Watch on YouTube buttons ko block karne ke liye */}
          <div className="absolute top-0 left-0 w-full h-[60px] z-20 bg-transparent cursor-default"></div>
          
          {/* Bottom Right Overlay: YouTube Logo ko block karne ke liye */}
          <div className="absolute bottom-0 right-0 w-[100px] h-[50px] z-20 bg-transparent cursor-default"></div>

          <div className="w-full aspect-video shadow-2xl shadow-blue-500/10">
            <iframe 
              className="w-full h-full"
              // Parameters: modestbranding=1 (logo chupata hai), rel=0 (related videos nahi dikhata)
              src={`https://www.youtube.com/embed/${activeVideo}?rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3`}
              title="Secured Content"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <div className="w-full lg:w-80 bg-gray-900/30 border-l border-gray-800 flex flex-col backdrop-blur-sm">
          <div className="p-5 border-b border-gray-800">
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Course Content</p>
            <h3 className="text-sm font-semibold text-gray-300">Lessons List</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {currentVideos.map((video, index) => (
              <div 
                key={video.id}
                onClick={() => setActiveVideo(video.videoId)}
                className={`p-4 border-b border-gray-800/50 cursor-pointer transition-all duration-300 flex items-center space-x-4 ${activeVideo === video.videoId ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'hover:bg-gray-800/40'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activeVideo === video.videoId ? 'bg-blue-500 shadow-lg shadow-blue-500/40' : 'bg-gray-800'}`}>
                  <Play size={12} fill={activeVideo === video.videoId ? "white" : "gray"} />
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xs font-bold truncate ${activeVideo === video.videoId ? 'text-blue-400' : 'text-gray-400'}`}>
                    {index + 1}. {video.title}
                  </p>
                  <p className="text-[9px] text-gray-600 mt-0.5">Duration: Paid Lecture</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 bg-gray-900/50 text-center">
             <p className="text-[9px] text-gray-500 italic">Secured by Anas Ahmed Academy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;