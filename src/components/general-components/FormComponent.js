import React, { useReducer, useState } from "react";
import styles from "./FormComponent.module.css";
import { FcGoogle } from "react-icons/fc";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase/firebase";
import { Link, redirect, useSearchParams, useNavigate } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isSignIn = searchParams.get("mode") === "signIn";
  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // setUserId(user.uid);
        console.log(user);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        console.log(user.uid);
        return user;
        // const token = credentials.accessToken;
        // console.log(token);
      })
      .then((result) => addData(result))
      .then(() => navigate("/trial"))
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  async function addData(result) {
    await setDoc(doc(db, "users", result.uid), {
      name: result.displayName,
      email: result.email,
      phototUrl: result.photoURL,
    });
    // await db.collection("users").doc(result).set({
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });
    // try {
    //   const docRef = await addDoc(collection(db, "users"), {
    //     first: "Muzammil",
    //     last: "Malik",
    //     born: 2002,
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }

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
    redirect("/trial");
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
        <button className={styles.googleLoginBtn} onClick={signInGoogle}>
          Sign in with Google <FcGoogle className={styles.googleIcon} />
        </button>
        <Link to={`?mode=${isSignIn ? "signUp" : "signIn"}`}>
          <button className={styles.toggleBtn}>
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FormComponent;
