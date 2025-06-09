import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-green-600 hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-green-600 text-black dark:text-white px-3 py-2 rounded transition-transform transform hover:scale-105 hover:shadow-md"
    >
      {isDark ? "💡" : '💡'}
    </button>
  );
};

export default DarkModeToggle;

