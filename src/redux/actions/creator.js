import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_QUIZES,
  SET_NEW_QUIZ,
  SET_QUIZES,
  SET_SCORE,
  GET_SCORE,
  SET_FB_QUIZ,
} from "./types";
// ******************All action creator of Auth******************
import { UseLocalStorage } from "../../helper/helper";

const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const getQuizes = () => {
  const quizes = localStorage.getItem("quizes");
  return quizes ? JSON.parse(quizes) : [];
};

const getScores = () => {
  const scores = localStorage.getItem("scores");
  return scores ? JSON.parse(scores) : [];
};

export const signupAction = (payload) => {
  UseLocalStorage("setItem", "users", JSON.stringify([...getUsers(), payload]));
  return {
    type: SIGNUP,
    payload: true,
  };
};

export const loginAction = (payload) => {
  const { email, password } = payload;
  const users = getUsers();
  if (users.length) {
    const user = users.filter(
      (user) => user.email === email && user.password === password
    );
    return {
      type: LOGIN,
      payload: new Boolean(user.length),
    };
  } else {
    return {
      type: LOGIN,
      paylaod: false,
    };
  }
};

export const logout = (payload) => {
  // let { token } = payload;
  return {
    type: LOGOUT,
    payload,
  };
};

// ****************** ALL actions creators for quiz ********************
export const setNewQuizAction = (payload) => {
  console.log(payload);
  UseLocalStorage(
    "setItem",
    "quizes",
    JSON.stringify([...getQuizes(), payload])
  );
  return {
    type: SET_NEW_QUIZ,
    payload: getQuizes(),
  };
};

export const setFirebaseData = (payload) => {
  return {
    type: SET_FB_QUIZ,
    payload,
  };
};

export const getQuizesAction = (payload) => {
  return {
    type: GET_QUIZES,
    payload,
  };
};

export const setRemainingQuizes = (payload) => {
  return {
    type: SET_FB_QUIZ,
    payload,
  };
};

// ******** Action crea for score **********
export const setScore = (payload) => {
  UseLocalStorage(
    "setItem",
    "scores",
    JSON.stringify([...getScores(), payload])
  );
  return {
    type: SET_SCORE,
    payload: getScores(),
  };
};

export const getScore = (payload) => {
  console.log({ payload });
  const scores = getScores();
  const _payload = payload
    ? scores.filter((score) => score.name.includes(payload))
    : scores;
  return {
    type: GET_SCORE,
    payload: _payload,
  };
};
