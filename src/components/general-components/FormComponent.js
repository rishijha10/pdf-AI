import React from "react";
import styles from "./FormComponent.module.css";
import { FcGoogle } from "react-icons/fc";
const FormComponent = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <p>Sign in with email</p>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
          />
          <input
            name="password"
            type="password"
            id="password"
            placeholder="password"
          />
          {/* <input type="submit" className={styles.submitButton} /> */}
          <button className={styles.submitButton}>Sign In</button>
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
