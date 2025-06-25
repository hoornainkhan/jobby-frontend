import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdQuiz } from 'react-icons/md';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(15).fill(null));
  const navigate = useNavigate();

  const optionMap = {
    'Low': 0,
    'Medium': 1,
    'High': 2
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/quiz/questions`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const submitQuiz = async () => {
    console.log("Submit button clicked");
    if (answers.includes(null)) {
      alert('Please answer all questions.');
      return;
    }

    // Group answers into 5 features (3 questions per category)
    const groupedAnswers = [
      Math.round((answers[0] + answers[1] + answers[2]) / 3),
      Math.round((answers[3] + answers[4] + answers[5]) / 3),
      Math.round((answers[6] + answers[7] + answers[8]) / 3),
      Math.round((answers[9] + answers[10] + answers[11]) / 3),
      Math.round((answers[12] + answers[13] + answers[14]) / 3),
    ];

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/quiz/submit`, {
        answers: groupedAnswers
      });

      localStorage.setItem('recommendedJob', res.data.recommendedJob);
      navigate('/result');
    } catch (err) {
      console.error('Error submitting quiz:', err);
      alert('There was an issue submitting your quiz. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl m-auto p-6 flex flex-col justify-center overflow-y-auto">
      <div className="text-center mb-8">
        <MdQuiz className="mx-auto text-purple-600 m-4 mb-5" size={50} />
        <h1 className="text-3xl font-bold mb-2">Career Fit Quiz</h1>
        <h4 className='text-gray-600 italic text-base'>
          Answer 15 questions to discover your best-fit job!
        </h4>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="mb-4 p-4 border rounded-xl shadow">
            <div className="flex items-center mb-2">
              <FaQuestionCircle className="text-blue-600 mr-2" />
              <p className="font-semibold">{idx + 1}. {q.text}</p>
            </div>
            {q.options.map((opt) => (
              <label key={opt} className="block mb-1 cursor-pointer">
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={optionMap[opt]}
                  onChange={() => {
                    const updated = [...answers];
                    updated[idx] = optionMap[opt];
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
