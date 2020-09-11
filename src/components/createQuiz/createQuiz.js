import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { toArray } from "lodash";
import shortid from "shortid";
import {
  setNewQuizAction,
  getQuizesAction,
  setFirebaseData,
} from "../../redux/actions/creator";
import QuizList from "./quizList";
import { useFirebase } from "../../Firebase/FirebaseContext";
import { formatFirebaseResponse } from "../../helper/helper";
import { toast } from "react-toastify";

const initData = {
  option1: {
    value: "",
  },
  option2: {
    value: "",
  },
  option3: {
    value: "",
  },
  option4: {
    value: "",
  },
};

export default function CreateQuiz() {
  const [name, setname] = useState("");
  const [quizOptions, setQuizOptions] = useState(initData);
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
      setQuizOptions(initData);
      getQuizfromFB();
      setname("");
      toast.success("New Quiz Added");
      console.log("@bs save on firebase");
    });
  };

  const getQuizfromFB = () => {
    firebase.quiz().once("value", (snapshot) => {
      const data = snapshot.val();
      const formattedData = formatFirebaseResponse(data);
      //set data into store from firebase
      dispatch(setFirebaseData(formattedData));
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
    getQuizfromFB();
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
                  value={quizOptions.option1.value}
                  onChange={(e) => optionSetter(e, 0)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option Two</label>

                <input
                  className="form-control mb-2"
                  placeholder="option 2"
                  name="option2"
                  value={quizOptions.option2.value}
                  onChange={(e) => optionSetter(e, 1)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option Three</label>

                <input
                  className="form-control mb-2"
                  placeholder="option 3"
                  name="option3"
                  value={quizOptions.option3.value}
                  onChange={(e) => optionSetter(e, 2)}
                />
              </div>
              <div className="col-lg-4">
                <label>Option Four</label>

                <input
                  className="form-control mb-2"
                  placeholder="option 4"
                  value={quizOptions.option4.value}
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
