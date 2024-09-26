import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import questions from '../questions'; // Import the questions

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(2500); // 35 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const handleFinishQuiz = async () => {
    const student = JSON.parse(localStorage.getItem('student'));
    const correctCount = Object.keys(answers).reduce((count, key) => {
      return count + (answers[key] === questions[key - 1].correctAnswer ? 1 : 0);
    }, 0);

    const result = {
      name: student.name,
      batch: student.batch,
      correctCount,
      totalQuestions: questions.length,
      answers: answers // Include all answers
    };

    try {
      await addDoc(collection(db, 'quizResults'), result);
      console.log('Quiz results saved successfully');
    } catch (e) {
      console.error('Error saving quiz results: ', e);
    }

    navigate('/confirmation');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishQuiz();
    }
  }, [timeLeft]);

  const handleChange = (option) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion + 1]: option })); // Store answers based on question number (1-based index)
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-indigo-600">{question.question}</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-lg border border-gray-200 mb-4 overflow-x-auto">
          {question.code}
        </pre>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option-${index}`}
                name={`question-${question.id}`}
                value={index}
                checked={answers[currentQuestion + 1] === index}
                onChange={() => handleChange(index)}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <label htmlFor={`option-${index}`} className="ml-3 text-gray-700 cursor-pointer">{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-12 max-w-4xl">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">Web Development Quiz</h2>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-lg font-semibold text-gray-700">
            Time Left: <span className="text-red-500">
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </span>
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full mb-6">
          <div
            className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}
          >
            {Math.round((currentQuestion + 1) / questions.length * 100)}%
          </div>
        </div>
        <div className="mb-8">
          {renderQuestion()}
        </div>
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
