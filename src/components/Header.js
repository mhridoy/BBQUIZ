import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { auth } from '../firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setIsLoggedIn(false);
      navigate('/teacher'); // Redirect to the login page after logout
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    // { name: 'Quiz', path: '/quiz' }, // Hide the Quiz tab
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollPosition > 50 ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            className="text-3xl font-extrabold tracking-wide flex items-center hover:scale-105 transition-transform duration-200" 
            to="/"
          >
            <Zap className="mr-2 text-yellow-400 animate-pulse" size={32} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 animate-gradient">
              Binary Beats
            </span>
          </Link>
          <ul className="hidden md:flex space-x-8 text-lg">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  className={`font-semibold transition-colors duration-200 relative group overflow-hidden ${
                    scrollPosition > 50 ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-yellow-300'
                  }`}
                  to={item.path}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              </li>
            ))}
            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className={`font-semibold transition-colors duration-200 relative group overflow-hidden ${
                    scrollPosition > 50 ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link 
                  className={`font-semibold transition-colors duration-200 relative group overflow-hidden ${
                    scrollPosition > 50 ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-yellow-300'
                  }`}
                  to="/teacher"
                >
                  Teacher Login
                </Link>
              </li>
            )}
          </ul>
          <div className="md:hidden">
            <button 
              className={`focus:outline-none ${scrollPosition > 50 ? 'text-gray-800' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col items-center py-4">
            {navItems.map((item, index) => (
              <li key={index} className="my-2">
                <Link 
                  className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-semibold"
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {isLoggedIn && (
              <li className="my-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-800 hover:text-purple-600 transition-colors duration-200 font-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
