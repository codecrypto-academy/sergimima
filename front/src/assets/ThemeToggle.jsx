import React from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-800 text-white p-2 rounded"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
