import React, { useState, useEffect, useCallback } from "react";
import Quiz from "./quiz";
import Info from "./infoBar";
import SaveScore from "./saveScore";
import { useSelector, useDispatch } from "react-redux";
import { toArray, shuffle } from "lodash";
import {
  getQuizesAction,
  setRemainingQuizes,
  setFirebaseData,
} from "../../redux/actions/creator";
import { useFirebase } from "../../Firebase/FirebaseContext";
import { formatFirebaseResponse } from "../../helper/helper";

export default function QuizBoard({ history }) {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizeNumber, setquizeNumber] = useState(0);
  const [done, setDone] = useState(false);
  const [length, setLength] = useState(0);

  const firebase = useFirebase();
  const dispatch = useDispatch();
  const _quizes = useSelector((state) => state.quiz.quizList);
  const quizes = shuffle(toArray(_quizes));

  const changeQuiz = useCallback(
    (bonus = 0) => {
      if (quizes.length === 0) {
        setDone(true);
        return setScore(score + bonus);
      }

      const randomQuizeIndex = Math.floor(Math.random() * quizes.length);
      const currentQuiz = quizes[randomQuizeIndex];
      const remainingQuizes = [...quizes];
      remainingQuizes.splice(randomQuizeIndex, 1);
      dispatch(setRemainingQuizes(remainingQuizes));
      setCurrentQuiz(currentQuiz);
      setLoading(false);
      setScore(score + bonus);
      setquizeNumber(quizeNumber + 1);
    },
    [score, quizeNumber, quizes, setLoading, , setquizeNumber]
  );

  //Change Quiz
  useEffect(() => {
    if (!currentQuiz && quizes.length) {
      changeQuiz();
    }
  }, [currentQuiz, quizes, changeQuiz]);

  // ** Get All Quizes from store**
  useEffect(() => {
    firebase.quiz().once("value", (snapshot) => {
      const data = snapshot.val();
      const formattedData = formatFirebaseResponse(data);
      //set data into store from firebase
      dispatch(setFirebaseData(formattedData));
    });

    dispatch(getQuizesAction());
  }, []);

  // ** Set quizes size
  useEffect(() => {
    if (!length) {
      setLength(quizes.length);
    }
  }, [quizes]);

  return (
    <>
      {!done && currentQuiz && (
        <div>
          <Info score={score} quizeNumber={quizeNumber} length={length} />
          <Quiz quiz={currentQuiz} changeQuiz={changeQuiz} />
        </div>
      )}
      {done && <SaveScore score={score} />}
    </>
  );
}
