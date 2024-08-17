// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What tag is used to define the largest heading in HTML?",
      options: [
        "<h1>",
        "<h6>",
        "<p>",
        "<div>"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which HTML tag is used to insert an image?",
      options: [
        "<img>",
        "<src>",
        "<image>",
        "<picture>"
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      question: "Which CSS property is used to change the background color?",
      options: [
        "color",
        "background-color",
        "border-color",
        "text-color"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      question: "What is the default value of the CSS `position` property?",
      options: [
        "relative",
        "absolute",
        "fixed",
        "static"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "Which HTML tag is used to create a hyperlink?",
      options: [
        "<link>",
        "<a>",
        "<href>",
        "<hyperlink>"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: "What CSS property is used to control the spacing between elements' content and their border?",
      options: [
        "margin",
        "padding",
        "border-spacing",
        "gap"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: "Which CSS property would you use to make the text bold?",
      options: [
        "font-style",
        "font-weight",
        "text-transform",
        "text-decoration"
      ],
      correctAnswer: 1
    },
    {
      id: 8,
      question: "How do you add a comment in CSS?",
      options: [
        "<!-- This is a comment -->",
        "// This is a comment",
        "/* This is a comment */",
        "# This is a comment"
      ],
      correctAnswer: 2
    },
    {
      id: 9,
      question: "In HTML, what does the `<br>` tag do?",
      options: [
        "Creates a horizontal line",
        "Breaks the line and moves to the next one",
        "Makes the text bold",
        "Inserts a blank space"
      ],
      correctAnswer: 1
    },
    {
      id: 10,
      question: "Which HTML tag is used to create a table?",
      options: [
        "<table>",
        "<td>",
        "<th>",
        "<tr>"
      ],
      correctAnswer: 0
    },
    {
      id: 11,
      question: "How do you create an ordered list in HTML?",
      options: [
        "<ul>",
        "<ol>",
        "<li>",
        "<dl>"
      ],
      correctAnswer: 1
    },
    {
      id: 12,
      question: "Which CSS property is used to make the text italic?",
      options: [
        "font-style: italic;",
        "font-weight: italic;",
        "text-transform: italic;",
        "text-decoration: italic;"
      ],
      correctAnswer: 0
    },
    {
      id: 13,
      question: "Which JavaScript function is used to display data in the browser's console?",
      options: [
        "console.display()",
        "console.log()",
        "alert()",
        "document.write()"
      ],
      correctAnswer: 1
    },
    {
      id: 14,
      question: "What does the `toUpperCase()` method do in JavaScript?",
      options: [
        "Converts a string to lowercase",
        "Converts a string to uppercase",
        "Capitalizes the first letter of a string",
        "Reverses the string"
      ],
      correctAnswer: 1
    },
    {
      id: 15,
      question: "Which HTML element is used to specify a form field where the user can enter data?",
      options: [
        "<textarea>",
        "<form>",
        "<input>",
        "<button>"
      ],
      correctAnswer: 2
    },
    {
      id: 16,
      question: "What does the CSS property `text-align: center;` do to text inside a block element?",
      options: [
        "Aligns text to the left",
        "Aligns text to the right",
        "Justifies the text",
        "Centers the text"
      ],
      correctAnswer: 3
    },
    {
      id: 17,
      question: "In JavaScript, which method is used to join two or more strings?",
      options: [
        "concat()",
        "join()",
        "combine()",
        "append()"
      ],
      correctAnswer: 0
    },
    {
      id: 18,
      question: "What is the purpose of the `<select>` tag in HTML?",
      options: [
        "To create a dropdown list",
        "To create a radio button",
        "To create a checkbox",
        "To create a button"
      ],
      correctAnswer: 0
    },
    {
      id: 19,
      question: "Which CSS property is used to set the space between letters in a text?",
      options: [
        "line-height",
        "letter-spacing",
        "word-spacing",
        "text-spacing"
      ],
      correctAnswer: 1
    },
    {
      id: 20,
      question: "Which HTML attribute is used to define inline styles?",
      options: [
        "class",
        "id",
        "style",
        "inline"
      ],
      correctAnswer: 2
    }
  ];

  const correctAnswers = {
    1: 0,  // <h1>
    2: 0,  // <img>
    3: 1,  // background-color
    4: 3,  // static
    5: 1,  // <a>
    6: 1,  // padding
    7: 1,  // font-weight
    8: 2,  // /* This is a comment */
    9: 1,  // Breaks the line and moves to the next one
    10: 0, // <table>
    11: 1, // <ol>
    12: 0, // font-style: italic;
    13: 1, // console.log()
    14: 1, // Converts a string to uppercase
    15: 2, // <input>
    16: 3, // Centers the text
    17: 0, // concat()
    18: 0, // To create a dropdown list
    19: 1, // letter-spacing
    20: 2  // style
  };
  
  const handleFinishQuiz = async () => {
    const student = JSON.parse(localStorage.getItem('student'));
    const correctCount = Object.keys(answers).reduce((count, key) => {
      return count + (answers[key] === correctAnswers[key] ? 1 : 0);
    }, 0);

    const result = {
      name: student.name,
      batch: student.batch,
      correctCount,
      totalQuestions: questions.length,
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
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion]: option }));
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
                checked={answers[currentQuestion] === index}
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