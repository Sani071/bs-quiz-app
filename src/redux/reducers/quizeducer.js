import {
  SET_NEW_QUIZ,
  GET_QUIZES,
  // SET_QUIZES,
  SET_SCORE,
  GET_SCORE,
  SET_FB_QUIZ
} from "../actions/types";
const initState = {
  quizList: [],
  scores: [],
};

const quizReducer = (state = initState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_NEW_QUIZ: {
      state = { ...state, quizList: payload };
      return state;
    }
    case GET_QUIZES: {
      return { ...state };
    }
    case SET_FB_QUIZ: {
      return { ...state, quizList: payload };
    }
    case SET_SCORE: {
      return { ...state };
    }
    case GET_SCORE: {
      return { ...state, scores: payload };
    }

    default:
      return state;
  }
};
export default quizReducer;
