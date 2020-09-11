import React, { useState } from "react";
import shortid from "shortid";
import { setScore } from "../../redux/actions/creator";
import { useDispatch } from "react-redux";
import ScoreList from "../scoresList/scoresList";
import { useFirebase } from "../../Firebase/FirebaseContext";

export default function SaveScoreForm({ score }) {
  const [username, setUsername] = useState("");
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const saveScore = (e) => {
    e.preventDefault();
    const record = {
      name: username,
      score,
      id: shortid(),
      time: `${new Date()}`,
    };
    console.log({record})
    setDone(true);
    dispatch(setScore(record));
    firebase.scores().push(record, () => {
      console.log("@bs save on firebase");
    });
  };
  return (
    <div className="text-center mx-auto">
      <h1>Your Score: {score}</h1>
      <form onSubmit={saveScore}>
        <input
          className="form-control w-50 d-inline"
          type="text"
          name="username"
          id="username"
          placeholder="Your Name"
          value={username}
          disabled={done}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-success mx-2"
          disabled={!username || done}
        >
          Save
        </button>
      </form>
      <button
        type="submit"
        className="btn btn-primary mx-2 mt-4"
        onClick={() => window.location.reload()}
      >
        Take Again
      </button>

      {done && (
        <div className="mt-2">
          <ScoreList
            title="Your Scores List"
            isHidden={true}
            userName={username}
          />
        </div>
      )}
    </div>
  );
}
