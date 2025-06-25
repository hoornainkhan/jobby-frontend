import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegSmileBeam } from 'react-icons/fa';

export default function Result() {
  const navigate = useNavigate();
  const job = localStorage.getItem('recommendedJob');

  useEffect(() => {
    if (!job) {
      // If no recommendation found, redirect back to quiz
      navigate('/quiz');
    }
  }, [job, navigate]);

  const handleBack = () => {
    localStorage.removeItem('recommendedJob');
    navigate('/quiz');
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 border rounded-xl shadow-lg text-center bg-white">
      <FaRegSmileBeam className="text-green-500 mx-auto mb-4" size={60} />
      <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
      <p className="text-gray-700 text-lg mb-6">
        Based on your answers, we recommend the following career path for you:
      </p>
      <h2 className="text-2xl font-semibold text-purple-700 mb-8">{job}</h2>

      <button
        onClick={handleBack}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Take Quiz Again
      </button>
    </div>
  );
}
