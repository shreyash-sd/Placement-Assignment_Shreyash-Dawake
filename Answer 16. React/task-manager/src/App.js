import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskDashboard";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={TaskDashboard} />
        <Navigate to="/dashboard" />
      </Routes>
    </Router>
  );
}

export default App;
