import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Book, CheckCircle, Award, RefreshCw, Search, Zap } from 'lucide-react';
import questions from '../questions'; // Import the questions

const TeacherDashboard = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'quizResults'));
      const resultsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(resultsData);
    } catch (error) {
      console.error("Error fetching results: ", error);
    }
    setIsLoading(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const calculateAverageScore = () => {
    if (results.length === 0) return 0;
    const totalScore = results.reduce((acc, result) => acc + (result.correctCount / result.totalQuestions) * 100, 0);
    return (totalScore / results.length).toFixed(2);
  };

  const chartData = results.map(result => ({
    name: result.name,
    score: (result.correctCount / result.totalQuestions) * 100
  }));

  const pieData = [
    { name: 'Above Average', value: results.filter(r => (r.correctCount / r.totalQuestions) * 100 > calculateAverageScore()).length },
    { name: 'Below Average', value: results.filter(r => (r.correctCount / r.totalQuestions) * 100 <= calculateAverageScore()).length }
  ];

  const COLORS = ['#8BE9FD', '#50FA7B', '#FFB86C', '#FF79C6'];

  const filteredResults = results.filter(result => 
    result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpandStudent = (studentId) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
    } else {
      setExpandedStudent(studentId);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-black opacity-50" />
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <motion.h1 
          className="text-5xl font-extrabold text-center mb-12 flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="mr-2 text-yellow-400 animate-pulse" size={48} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-gradient">
            Binary Beats Dashboard
          </span>
        </motion.h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {[
            { title: "Total Students", value: results.length, icon: Users, color: "bg-blue-500" },
            { title: "Average Score", value: `${calculateAverageScore()}%`, icon: CheckCircle, color: "bg-green-500" },
            { title: "Total Quizzes", value: results.length > 0 ? results[0].totalQuestions : 0, icon: Book, color: "bg-yellow-500" },
            { title: "Highest Score", value: `${Math.max(...results.map(r => (r.correctCount / r.totalQuestions) * 100), 0).toFixed(2)}%`, icon: Award, color: "bg-red-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`${stat.color} rounded-lg shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase font-semibold">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon size={40} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div 
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Student Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Score Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div 
          className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
              <h2 className="text-2xl font-semibold text-white">Detailed Results</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-20 border-transparent text-black placeholder-gray-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <button 
                  onClick={fetchResults}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  <RefreshCw size={18} className="mr-2" />
                  Refresh
                </button>
              </div>
            </div>
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-x-auto"
                >
                  <table className="min-w-full">
                    <thead className="bg-blue-900 bg-opacity-80">
                      <tr>
                        <th className="py-3 px-4 text-left text-white">Name</th>
                        <th className="py-3 px-4 text-left text-white">Batch</th>
                        <th className="py-3 px-4 text-left text-white">Correct Answers</th>
                        <th className="py-3 px-4 text-left text-white">Total Questions</th>
                        <th className="py-3 px-4 text-left text-white">Score</th>
                        <th className="py-3 px-4 text-left text-white">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResults.map((result, index) => (
                        <React.Fragment key={result.id}>
                          <motion.tr 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                          >
                            <td className="py-3 px-4 border-b border-gray-700 text-white">{result.name}</td>
                            <td className="py-3 px-4 border-b border-gray-700 text-white">{result.batch}</td>
                            <td className="py-3 px-4 border-b border-gray-700 text-white">{result.correctCount}</td>
                            <td className="py-3 px-4 border-b border-gray-700 text-white">{result.totalQuestions}</td>
                            <td className="py-3 px-4 border-b border-gray-700 text-white">
                              {((result.correctCount / result.totalQuestions) * 100).toFixed(2)}%
                            </td>
                            <td className="py-3 px-4 border-b border-gray-700 text-white">
                              <button 
                                onClick={() => toggleExpandStudent(result.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                              >
                                {expandedStudent === result.id ? 'Hide Details' : 'Show Details'}
                              </button>
                            </td>
                          </motion.tr>
                          {expandedStudent === result.id && (
                            <motion.tr 
                              key={`${result.id}-details`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-white bg-opacity-10"
                            >
                              <td colSpan="6" className="py-3 px-4 border-b border-gray-700 text-white">
                                <h3 className="text-lg font-semibold mb-4">Answers:</h3>
                                <ul className="space-y-2">
                                  {result.answers && Object.keys(result.answers).map((questionId) => {
                                    const question = questions.find(q => q.id === parseInt(questionId));
                                    const studentAnswer = result.answers[questionId];
                                    const correctAnswer = question.correctAnswer;
                                    return (
                                      <li key={questionId}>
                                        <strong>Question: </strong>{question?.question}
                                        <br />
                                        <strong>Correct Answer: </strong>{question?.options[correctAnswer]}
                                        <br />
                                        <strong>Student's Answer: </strong>{question?.options[studentAnswer]}
                                        <br />
                                        <strong>Status: </strong>{studentAnswer === correctAnswer ? 'Correct' : 'Incorrect'}
                                      </li>
                                    );
                                  })}
                                  {!result.answers && <li>No answers available.</li>}
                                </ul>
                              </td>
                            </motion.tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
