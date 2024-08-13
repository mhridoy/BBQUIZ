// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentForm from './components/StudentForm';
import Quiz from './components/Quiz';
import Confirmation from './components/Confirmation';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/teacher" element={<Login />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
