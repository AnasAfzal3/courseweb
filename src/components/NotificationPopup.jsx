import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';

const students = ["Ahmed", "Sara", "Zain", "Hamza", "Ayesha", "Bilal"];
const coursesList = ["Ethical Hacking", "Web Development", "Python Programming"];

const NotificationPopup = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ name: "", course: "" });

  useEffect(() => {
    const showNotification = () => {
      // Random student aur course select karein
      const randomName = students[Math.floor(Math.random() * students.length)];
      const randomCourse = coursesList[Math.floor(Math.random() * coursesList.length)];
      
      setData({ name: randomName, course: randomCourse });
      setShow(true);

      // 5 second baad hide kar dein
      setTimeout(() => {
        setShow(false);
      }, 5000);
    };

    // Har 20 seconds baad dikhayein (Testing ke liye 20s rakha hai, aap 240000ms kar sakte hain 4 min ke liye)
    const interval = setInterval(showNotification, 20000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-6 left-6 z-[100] transition-all duration-500 transform ${show ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-2xl flex items-center space-x-4 max-w-sm backdrop-blur-md bg-opacity-90">
        <div className="bg-green-500/20 p-2 rounded-full">
          <UserCheck className="text-green-500" size={24} />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">New Admission!</p>
          <p className="text-gray-400 text-xs">
            <span className="text-blue-400 font-bold">New Student</span> recently enrolled in <span className="text-white italic">{data.course}</span>
          </p>
          <p className="text-[10px] text-gray-500 mt-1">2 minutes ago</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;