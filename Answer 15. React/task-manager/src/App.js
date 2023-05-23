import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/">
            {token ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setToken={setToken} />
            )}
          </Route>
          <Route path="/dashboard">
            {token ? <Dashboard token={token} /> : <Navigate to="/" />}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
