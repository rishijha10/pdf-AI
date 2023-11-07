import React from "react";
import styles from "./FormComponent.module.css";
const FormComponent = () => {
  return (
    <div className={styles.outerContainer}>
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
    </div>
  );
};

export default FormComponent;
