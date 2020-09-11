import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-4">@BS Quiz App</h1>
      <Link to="/quiz" className="btn">
        Take Quiz
      </Link>
      <Link to="/admin" className="btn ml-3">
        Set Quiz
      </Link>
      <Link to="/scoreList" className="btn ml-3">
        All Scores
      </Link>
    </div>
  );
}
