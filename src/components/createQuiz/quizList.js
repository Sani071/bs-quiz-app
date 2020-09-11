import React from "react";
import { useSelector } from "react-redux";
import { toArray } from "lodash";

export default function QuizList() {
  const quizList = useSelector((state) => state.quiz.quizList);

  return (
    <>
      {quizList.length ? (
        <div className="p-4">
          <h5>ALL Quizes</h5>
          <ul className="list">
            {toArray(quizList).map((itm, idx) => (
              <li className="list-item" key={idx}>
                {itm.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div id="loader" />
      )}
    </>
  );
}
