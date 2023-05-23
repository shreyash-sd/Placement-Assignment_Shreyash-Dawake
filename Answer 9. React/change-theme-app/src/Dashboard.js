import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Dashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Style object based on the theme
  const styles = {
    backgroundColor: theme === 'light' ? '#f2f2f2' : '#222',
    color: theme === 'light' ? '#222' : '#f2f2f2',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div style={styles}>
      <h1>Dashboard</h1>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

export default Dashboard;
