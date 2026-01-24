// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // Iske liye 'npm install react-firebase-hooks' karein

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;