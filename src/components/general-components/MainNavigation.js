import React from "react";
import styles from "./MainNavigation.module.css";
const MainNavigation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p>PDFPal</p>
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
          <button>
            <span>Log in</span>
          </button>
          <button className={styles.vibrant}>Get Started For Free</button>
        </section>
      </div>
    </div>
  );
};

export default MainNavigation;
