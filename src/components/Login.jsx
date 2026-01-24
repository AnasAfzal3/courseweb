import React, { useState, useEffect } from 'react'; // useEffect add kiya
import { Loader2 } from 'lucide-react';
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"; // onAuthStateChanged add kiya
import { auth, googleProvider } from "../firebase"; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- NEW LOGIC: Agar pehle se login ho to dashboard bhej do ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard"); // Auto redirect if logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard"); // Login ke baad Dashboard par redirect
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google login mein masla hua hai. Dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl max-w-md w-full text-center animate-in fade-in zoom-in duration-500">
        
        {/* Aapka Logo */}
        <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-3xl font-bold text-white">A</span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-400 mb-8">
          Apne recorded courses aur private sections access karne ke liye login karein.
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-3 text-blue-600" />
          ) : (
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
              className="h-5 w-5 mr-3" 
            />
          )}
          {loading ? "Signing in..." : "Continue with Google"}
        </button>

        <p className="text-gray-500 text-sm mt-6">
          Authorized access for <span className="text-blue-400">Sir Anas Web</span> students only.
        </p>
      </div>
    </div>
  );
};

export default Login;