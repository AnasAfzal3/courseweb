import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldAlert, Award } from 'lucide-react';

const Verify = () => {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Yahan hum Google Sheet se data fetch karenge
    const scriptURL = `https://script.google.com/macros/s/AKfycbxZHXR95DVJG-donTpqUr1NKvYe6akC2G0a-9wqRCcZc_CzPLId8C-6um3JD_i1N4VP1g/exec?verifyId=${certId}`;

    try {
      const response = await fetch(scriptURL);
      const data = await response.json();
      
      if (data.found) {
        setResult({ status: 'success', name: data.name, course: data.course, date: data.date });
      } else {
        setResult({ status: 'error', message: 'Invalid Certificate ID. Record not found!' });
      }
    } catch (error) {
      setResult({ status: 'error', message: 'System busy. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <Award className="mx-auto text-blue-500 mb-4" size={50} />
        <h1 className="text-3xl font-bold mb-2">Certificate Validator</h1>
        <p className="text-gray-400 mb-8 text-sm">Official verification portal for Sir Anas Web students.</p>

        <form onSubmit={handleVerify} className="relative mb-8">
          <input 
            type="text" 
            placeholder="Enter Certificate ID (e.g. AM-101)"
            className="w-full bg-gray-800 border border-gray-700 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500 transition shadow-2xl"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />
          <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 px-6 rounded-xl transition flex items-center">
            {loading ? "..." : <Search size={20} />}
          </button>
        </form>

        {/* Results Section */}
        {result && (
          <div className={`p-6 rounded-3xl border animate-in zoom-in duration-300 ${
            result.status === 'success' ? 'bg-green-500/10 border-green-500/50' : 'bg-red-500/10 border-red-500/50'
          }`}>
            {result.status === 'success' ? (
              <div className="text-center">
                <ShieldCheck className="mx-auto text-green-500 mb-2" size={40} />
                <h3 className="text-xl font-bold text-green-400 italic underline">Verified Graduate</h3>
                <div className="mt-4 text-left space-y-2 text-sm">
                  <p><span className="text-gray-500">Student Name:</span> <span className="font-bold">{result.name}</span></p>
                  <p><span className="text-gray-500">Course:</span> <span className="font-bold">{result.course}</span></p>
                  <p><span className="text-gray-500">Issue Date:</span> <span className="font-bold">{result.date}</span></p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <ShieldAlert className="mx-auto text-red-500 mb-2" size={40} />
                <p className="text-red-400 font-bold">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;