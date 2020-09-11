import React, { useState } from "react";

export default function Quiz({ quiz, changeQuiz }) {
  const [actionClass, setActionClass] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [answering, setAnswering] = useState(false);

  const checkAnswer = (selectedAnswer, index) => {
    if (answering) return;
    setAnswering(true);
    setSelectedAnswer(index);
    const isCurrectAnswer = selectedAnswer === quiz.correctAnswer;
    const actionClass = isCurrectAnswer ? "correct" : "incorrect";
    setActionClass(actionClass);
    const bonus = isCurrectAnswer ? 10 : 0;

    setTimeout(() => {
      setSelectedAnswer(-1);
      setAnswering(false);
      changeQuiz(bonus);
    }, 1200);
  };

  return (
    <div>
      <h4 className="text-center my-5">{quiz?.name}</h4>
      {quiz &&
        quiz.options.map((option, index) => (
          <div
            key={index}
            className={`option-container ${
              selectedAnswer === index && actionClass
            }`}
            onClick={() => checkAnswer(option.value, index)}
          >
            <p className="option-prefix m-0">{index + 1}</p>
            <p className="option-text m-0">{option.value}</p>
          </div>
        ))}
    </div>
  );
}
