import React, { useReducer } from "react";
import styles from "./FormComponent.module.css";
import { FcGoogle } from "react-icons/fc";
const initialStates = {
  email: "",
  password: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "password":
      return { ...state, password: action.value };
    case "reset":
      return { email: "", password: "" };
    default:
      return { ...state };
  }
};
const FormComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialStates);
  function formSubmit(e) {
    e.preventDefault();
    console.log(state.email);
    console.log(state.password);
    dispatch({ type: "reset" });
  }
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <p>Sign in with email</p>
        <form onSubmit={formSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
            onChange={(e) => dispatch({ type: "email", value: e.target.value })}
            value={state.email}
          />
          <input
            name="password"
            type="password"
            id="password"
            placeholder="password"
            onChange={(e) =>
              dispatch({ type: "password", value: e.target.value })
            }
            value={state.password}
          />
          <input
            type="submit"
            className={styles.submitButton}
            value={"Sign in"}
          />
          {/* <button className={styles.submitButton}>Sign In</button> */}
        </form>
        <section>
          <h4>
            <span>or</span>
          </h4>
          {/* <p>this is some content other</p> */}
        </section>
        <button className={styles.googleLoginBtn}>
          Sign in with Google <FcGoogle className={styles.googleIcon} />
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
