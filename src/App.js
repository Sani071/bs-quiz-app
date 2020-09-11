import React from "react";
import "./App.css";
import Auth from "./components/auth/auth";
import CreateQuiz from "./components/createQuiz/createQuiz";
import Quiz from "./components/play/quizBoard";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import ProtectedRoute from "./helper/protectRoute";
import ScoreList from "./components/scoresList/scoresList";


function App() {
  return (
    <div className="App container mt-3">
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={Auth} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/scoreList" component={ScoreList} />
      <ProtectedRoute path="/quizsetting" component={CreateQuiz} />
  
    </div>
  );
}

export default App;
