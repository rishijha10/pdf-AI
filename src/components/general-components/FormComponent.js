import React, { useEffect, useReducer, useState } from "react";
import styles from "./FormComponent.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link, useSearchParams } from "react-router-dom";
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
  const [userAuth, setUserAuth] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialStates);
  const [searchParams] = useSearchParams();
  const isSignIn = searchParams.get("mode") === "signIn";
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user.email);
      } else {
        setUserAuth(null);
      }
    });
  }, []);
  function formSubmit(e) {
    e.preventDefault();
    {
      isSignIn
        ? signInWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
              console.log(userCredential);
            })
            .catch((err) => console.error(err.message))
        : createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
              console.log(userCredential);
            })
            .catch((err) => console.error(err.message));
    }
    console.log(state.email);
    console.log(state.password);
    dispatch({ type: "reset" });
  }
  function signOutUser() {
    signOut(auth)
      .then(console.log("Signout successful"))
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <p>{`${isSignIn ? "Sign In" : "Sign Up"} with email`}</p>
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
            value={isSignIn ? "Sign In" : "Sign Up"}
          />
          {/* <button className={styles.submitButton}>Sign In</button> */}
        </form>
        <section>
          <h4>
            <span>or</span>
          </h4>
        </section>
        <button className={styles.googleLoginBtn}>
          Sign in with Google <FcGoogle className={styles.googleIcon} />
        </button>
        <Link to={`?mode=${isSignIn ? "signUp" : "signIn"}`}>
          <button className={styles.toggleBtn}>
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </Link>
        <p>{userAuth && `User's email id: ${userAuth}`}</p>
        <button onClick={signOutUser}>Sign Out</button>
      </div>
    </div>
  );
};

export default FormComponent;
