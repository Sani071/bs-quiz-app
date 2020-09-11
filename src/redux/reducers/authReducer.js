import { LOGIN, LOGOUT, SIGNUP } from "../actions/types";
const initState = {
  isLoggedIn: false,
  signup: false,
};

const authReducer = (state = initState, action) => {
  let { type, payload } = action;
  console.log({payload})
  switch (type) {
    case SIGNUP: {
      return { ...state, signup: payload };
    }
    case LOGIN: {
      return { ...state, isLoggedIn: payload };
    }
    case LOGOUT: {
      return { ...state, isLoggedIn: payload };
    }
    default:
      return state;
  }
};
export default authReducer;
