import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getScore } from "../../redux/actions/creator";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

export default function ScoreList({ userName, title, isHidden }) {
  const [username, setUsername] = useState("");
  const scores = useSelector((state) => state.quiz.scores);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getScore(userName));
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(getScore(username));
  }, [username]);
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
            {scores.map((record) => (
              <li key={record.id} className="prev-score">
                <span className={isHidden ? "d-none" : "text-info"}>
                  {record.name} -
                </span>{" "}
                <span className="text-success">{record.score}</span> at{" "}
                {moment(record.time).format("DD/MM/YYYY, h:mm")}
              </li>
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
