import React from "react";
import styles from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <NavLink to="/">
          <section className={styles.logo}>
            <div className={styles.first}></div>
            <div className={styles.second}></div>
            <div className={styles.third}></div>
            <p>ReadifyAI</p>
          </section>
        </NavLink>
        {/* <p>PDFPal</p> */}
        <nav className={styles.navLinks}>
          <ul>
            <li>Product</li>
            <li>Solution</li>
            <li>Pricing</li>
            <li>Resources</li>
            <li>Partners</li>
          </ul>
        </nav>
        <section className={styles.navButtons}>
          <Link to="/auth?mode=signIn">
            <button>
              <span>Log in</span>
            </button>
          </Link>
          <NavLink to="/auth?mode=signUp">
            <button className={styles.vibrant}>Get Started For Free</button>
          </NavLink>
        </section>
      </div>
    </div>
  );
};

export default MainNavigation;
