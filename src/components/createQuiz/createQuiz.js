import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { toArray } from "lodash";
import shortid from "shortid";
import { setNewQuizAction, getQuizesAction } from "../../redux/actions/creator";
import QuizList from "./quizList";
import { useFirebase } from "../../Firebase/FirebaseContext";

export default function CreateQuiz() {
  const [name, setname] = useState("");
  const [quizOptions, setQuizOptions] = useState();
  const [correctAnswer, setCorrectAnswer] = useState("");
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const firebase = useFirebase();

  const optionSetter = (e, sl = 0) => {
    const { name, value } = e.target;
    setCorrectAnswer("");
    var data = null;
    if (quizOptions) {
      data = {
        ...quizOptions,
        [name]: {
          ...quizOptions[name],
          value,
        },
      };
    } else {
      data = {
        ...quizOptions,
        [name]: {
          value,
        },
      };
    }
    setQuizOptions(data);
  };

  const addHandler = (e) => {
    const payload = {
      name,
      options: toArray(quizOptions),
      correctAnswer: correctAnswer.value,
      id: shortid(),
    };

    //save data into localStorage
    //dispatch(setNewQuizAction(payload));

    // Save data on firebase database
    firebase.quiz().push(payload, () => {
      console.log("@bs save on firebase")
     });
  };
  useEffect(() => {
    const _quizOptions = toArray(quizOptions);
    const _options = _quizOptions.map((itm, idx) => {
      return {
        value: itm.value,
        label: `options${idx + 1}`,
      };
    });
    setOptions(_options);
  }, [quizOptions]);

  useEffect(() => {
    dispatch(getQuizesAction());
  }, []);
  return (
    <>
      <div className="card shadow">
        <div className="card-header text-center">
          <h2>Add a new Quiz</h2>
        </div>
        <div className="card-body">
          <form className="form">
            <div className="row">
              <div className="col-lg-12">
                <label>Quiz Name</label>
                <input
                  className="form-control mb-2"
                  placeholder="Quiz name"
                  name="quizeName"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option One</label>
                <input
                  className="form-control mb-2"
                  placeholder="option 1"
                  name="option1"
                  onChange={(e) => optionSetter(e, 0)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option Two</label>

                <input
                  className="form-control mb-2"
                  placeholder="option 2"
                  name="option2"
                  onChange={(e) => optionSetter(e, 1)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option Three</label>

                <input
                  className="form-control mb-2"
                  placeholder="option 3"
                  name="option3"
                  onChange={(e) => optionSetter(e, 2)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option Four</label>

                <input
                  className="form-control mb-2"
                  placeholder="option 4"
                  name="option4"
                  onChange={(e) => optionSetter(e, 3)}
                />
              </div>
              <div className="col-lg-4">
                <label>Select Corret Answer</label>
                <Select
                  placeholder="Select Corret Answer"
                  options={options}
                  onChange={(v) => setCorrectAnswer(v)}
                  value={correctAnswer}
                />
              </div>
            </div>
          </form>

          <div className="">
            <button
              disabled={!toArray(quizOptions).length || !correctAnswer || !name}
              className="btn btn-primary"
              onClick={addHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <QuizList />
    </>
  );
}
