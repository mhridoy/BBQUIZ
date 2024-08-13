// src/components/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore

const TeacherDashboard = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'quizResults'));
        const resultsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(resultsData);
      } catch (error) {
        console.error("Error fetching results: ", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container mx-auto mt-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Teacher Dashboard</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-700">
              <th className="py-2">Name</th>
              <th className="py-2">Batch</th>
              <th className="py-2">Correct Answers</th>
              <th className="py-2">Total Questions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="text-center">
                <td className="py-2 border-b">{result.name}</td>
                <td className="py-2 border-b">{result.batch}</td>
                <td className="py-2 border-b">{result.correctCount}</td>
                <td className="py-2 border-b">{result.totalQuestions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
