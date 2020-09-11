import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import { getScore, setScore } from "../../redux/actions/creator";
import { Link } from "react-router-dom";
// import { debounce } from "lodash";
import { useFirebase } from "../../Firebase/FirebaseContext";
import { formatFirebaseResponse } from "../../helper/helper";
import List from "./list";

export default function ScoreList({ userName, title, isHidden }) {
  const [username, setUsername] = useState("");
  const [firebaseData, setFirebaseData] = useState("");
  const scores = useSelector((state) => state.quiz.scores);
  const dispatch = useDispatch();
  const firebase = useFirebase();
  useEffect(() => {
    var ref = firebase.scores();
    var query = ref.orderByChild("scroes/name").equalTo("sani");
    console.log("call 2");
    query.once("value", function (snapshot) {
      console.log("call 3", snapshot);
      snapshot.forEach(function (child) {
        console.log(child.key, child.val().name);
      });
    });

    setTimeout(() => {
      dispatch(getScore(userName));
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getScore(username));
  }, [username]);

  useEffect(() => {
    if (!userName && !username) {
      firebase.scores().once("value", (snapshot) => {
        const data = snapshot.val();
        const formattedData = formatFirebaseResponse(data);
        setFirebaseData(formattedData);
      });
    } else {
      setFirebaseData("");
    }
  }, [firebase, username, userName]); //

  return (
    <>
      {!isHidden && (
        <div className="text-center mb-2">
          <input
            className="form-control w-50 d-inline"
            type="text"
            name="username"
            id="username"
            placeholder="Your Name"
            value={username}
            //   disabled={done}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      )}
      {scores && scores.length ? (
        <>
          <h3 className="text-center">{title || `All Scores (${username})`}</h3>
          <hr />
          <ul id="prevScoresList">
            {firebaseData
              ? firebaseData.map((record) => (
                  <List isHidden={isHidden} record={record} />
                ))
              : scores.map((record) => (
                  <List isHidden={isHidden} record={record} />
                ))}
          </ul>
          <div className="text-center mb-4">
            <Link to="/" className="btn">
              Back Home
            </Link>
          </div>
        </>
      ) : (
        <div id="loader" />
      )}
    </>
  );
}
