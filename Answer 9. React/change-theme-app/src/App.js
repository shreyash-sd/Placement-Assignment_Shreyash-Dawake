
import './App.css';
import { ThemeProvider } from './ThemeContext';
import Dashboard from './Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
