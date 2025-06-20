import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdQuiz } from 'react-icons/md';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const submitQuiz = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const res = await axios.post('http://localhost:5000/api/quiz/submit', { userId, answers });
      localStorage.setItem('recommendedJob', res.data.recommendedJob);
      navigate('/result');
    } catch (err) {
      console.error('Error submitting quiz:', err);
      alert('There was an issue submitting your quiz. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl m-auto p-6 flex flex-col justify-center overflow-y-auto">
      <div className="text-center mb-8">
        <MdQuiz className="mx-auto text-purple-600 m-4 mb-5" size={50} />
        <h1 className="text-3xl font-bold mb-2">Career Fit Quiz</h1>
        <h4 className='text-gray-600 italic text-base'>
          Answer a few quick questions to get your personalized job recommendations!
        </h4>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q._id} className="mb-4 p-4 border rounded-xl shadow">
            <div className="flex items-center mb-2">
              <FaQuestionCircle className="text-blue-600 mr-2" />
              <p className="font-semibold">{q.text}</p>
            </div>
            {q.options.map(opt => (
              <label key={opt} className="block mb-1">
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={opt}
                  onChange={() => {
                    const updated = [...answers];
                    updated[idx] = opt;
                    setAnswers(updated);
                  }}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={submitQuiz}
        className="mt-8 bg-purple-600 text-white px-6 py-3 w-full border rounded-xl hover:bg-purple-700 transition"
      >
        Submit & Get Recommendation
      </button>
    </div>
  );
}
