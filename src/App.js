import React from "react";
import "./App.css";
import Auth from "./components/auth/auth";
import CreateQuiz from "./components/createQuiz/createQuiz";
import Quiz from "./components/quizBoard/quizBoard";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import ProtectedRoute from "./helper/protectRoute";
import ScoreList from "./components/scoresList/scoresList";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App container mt-3">
      <ToastContainer position="bottom-right"/>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Auth} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/scoreList" component={ScoreList} />
      <ProtectedRoute path="/quizsetting" component={CreateQuiz} />
  
    </div>
  );
}

export default App;
