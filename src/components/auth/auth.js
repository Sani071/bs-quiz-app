import React, { useState, useEffect, memo } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupAction, loginAction } from "../../redux/actions/creator";

function Auth(props) {
  const [state, setState] = useState(0);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [signupDisabled, setSignupDisabled] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const isSignup = useSelector((state) => {
    return state.auth.signup;
  });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const changeHandler = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e, type) => {
    e.preventDefault();
    if (type === "signup") {
      dispatch(signupAction(userInfo));
    }
    if (type === "login") {
      dispatch(loginAction(userInfo));
    }
  };

  useEffect(() => {
    const isDisabled = userInfo.password && userInfo.userName && userInfo.email;
    const _isLoginDisabled = userInfo.password && userInfo.email;
    setSignupDisabled(!isDisabled);
    setLoginDisabled(!_isLoginDisabled);
  }, [userInfo]);

  useEffect(() => {
    setUserInfo({
      userName: "",
      email: "",
      password: "",
    });
  }, [state]);

  useEffect(() => {
    isSignup && setState(1);
  }, [isSignup]);

  if (isLoggedIn) {
    return <Redirect to="/quizsetting" />;
  }

  const { userName, email, password } = userInfo;
  const emailView = (
    <div className="forms_field">
      <input
        type="email"
        placeholder="Email"
        className="forms_field-input"
        required
        autofocus
        onChange={changeHandler}
        name="email"
        value={email}
      />
    </div>
  );
  const passwordView = (
    <div className="forms_field">
      <input
        type="password"
        placeholder="Password"
        className="forms_field-input"
        required
        onChange={changeHandler}
        name="password"
        value={password}
      />
    </div>
  );
  return (
    <>
      <section className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-unregistered">
              <h2 className="user_unregistered-title">
                Don't have an account?
              </h2>
              <p className="user_unregistered-text text-white">
                @BrainStation23, a globally leading one of the best software
                development companies in Bangladesh. We help to transform your
                business into the digital sphere. ❤❤💕
              </p>
              <button
                onClick={() => {
                  setState(0);
                }}
                className="user_unregistered-signup"
                id="signup-button"
              >
                Sign up
              </button>
            </div>

            <div className="user_options-registered">
              <h2 className="user_registered-title">Have an account?</h2>
              <p className="user_registered-text text-white">
                Make life easy with @BS.😊
              </p>
              <button
                onClick={() => {
                  setState(1);
                }}
                className="user_registered-login"
                id="login-button"
              >
                Login
              </button>
            </div>
          </div>

          <div
            className={`user_options-forms ${
              !state ? "bounceLeft" : "bounceRight"
            }`}
            id="user_options-forms"
          >
            <div className="user_forms-login">
              <h2 className="forms_title loginTitle">Login</h2>
              <form className="forms_form">
                <fieldset className="forms_fieldset">
                  {emailView}
                  {passwordView}
                </fieldset>
                <div className="forms_buttons">
                  {/* <button type="button" className="forms_buttons-forgot">
                    Forgot password?
                  </button> */}
                  <button
                    onClick={(e) => submitHandler(e, "login")}
                    type="submit"
                    disabled={loginDisabled}
                    className="forms_buttons-action"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="user_forms-signup">
              <h2 className="forms_title signUp">Sign Up</h2>
              <form className="forms_form">
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="forms_field-input"
                      required
                      onChange={changeHandler}
                      name="userName"
                      value={userName}
                    />
                  </div>

                  {emailView}

                  {passwordView}
                  {/* <div className="forms_field">
                    <div class="upload-btn-wrapper">
                      <button type="button" class="btnn">
                        {isUploading ? "Uploading...." : "Upload Your Image"}
                      </button>
                      <input
                        onChange={(e) => imageChaneHandler(e)}
                        name="image"
                        accept="image/x-png,image/jpeg"
                        type="file"
                        name="myfile"
                        required
                      />
                    </div>
                    <p
                      style={{ fontSize: "12px" }}
                      className="text-success ml-1 my-1"
                    >
                      {fileUploaded ? "File Uploaded" : ""}
                    </p>
                  </div> */}
                </fieldset>
                <div className="forms_buttons">
                  <button
                    onClick={(e) => submitHandler(e, "signup")}
                    type="submit"
                    className="forms_buttons-action"
                    disabled={signupDisabled}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default memo(Auth);
