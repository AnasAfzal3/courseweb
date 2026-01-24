import React, { useState,useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const EnrollmentModal = ({ isOpen, onClose, selectedCourse }) => {
  const [loading, setLoading] = useState(false);
  const [userIp, setUserIp] = useState("")
  useEffect(() => {
    if (isOpen) {
      fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => setUserIp(data.ip))
        .catch(err => console.error("IP fetch error:", err));
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const scriptURL = "https://script.google.com/macros/s/AKfycbxuYSLWQYTF-RauvN3cbhGvtnW49TFZGbXW4ocZpwk05QWVfEoUzaDdqqkJ01uNijgl/exec";
  const form = e.target;

  try {
    console.log(form)
    await fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
    });

    alert("Shukriya! Aapka admission form jama ho gaya hai.");
    onClose();
    form.reset();

  } catch (err) {
    alert("Maazrat! Data save nahi ho saka.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Student Registration
          </h2>
          <p className="text-gray-400 text-sm mb-6">Apni details fill karein taake hum aapse raabta kar sakein.</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="hidden" name="ipAddress" value={userIp} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                <input name="firstName" type="text" placeholder="Ahmed" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                <input name="lastName" type="text" placeholder="Ali" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp Number</label>
              <input name="whatsapp" type="tel" placeholder="+92 300 1234567" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
              <input name="city" type="text" placeholder="Karachi" required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500" />
            </div>

            {/* Course Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Course</label>
              <select name="course" defaultValue={selectedCourse} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 appearance-none">
                <option value="Ethical Hacking / Pen Testing">Ethical Hacking / Pen Testing</option>
                <option value="Full Stack Web Development">Full Stack Web Development</option>
                <option value="Python for Beginners">Python for Beginners</option>
                <option value="Windows Exploit Development">Windows Exploit Development</option>
              </select>
            </div>

            {/* Mode of Study */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Learning Mode</label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="mode" value="Online" defaultChecked className="text-blue-500" />
                  <span className="text-sm text-gray-300">Online</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="mode" value="Physical" className="text-blue-500" />
                  <span className="text-sm text-gray-300">Physical</span>
                </label>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 rounded-xl font-bold mt-4 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;