import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code } from 'lucide-react';

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-black opacity-50" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12 overflow-hidden">
      <BackgroundAnimation />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            className="text-3xl font-bold mb-6 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="mr-2 text-yellow-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Binary Beats
            </span>
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 text-center text-sm opacity-75"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="mb-2">Empowering minds, one byte at a time</p>
          <p>© {new Date().getFullYear()} Binary Beats Exam Portal | All rights reserved</p>
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-2 right-2 text-xs opacity-50 flex items-center"
        whileHover={{ opacity: 1 }}
      >
        <Code size={14} className="mr-1" /> with <span className="text-red-500 mx-1">♥</span> by Binary Beats Team
      </motion.div>
    </footer>
  );
};

export default Footer;
