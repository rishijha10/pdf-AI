import React from "react";
import styles from "./HeroSection.module.css";
const HeroSection = () => {
  return (
    <div className={styles.container}>
      <section>
        <h1>
          It's not just reading anymore, <br />
          it's a <span>conversation</span>
        </h1>
        <p>
          Chat your way through long documents. Command our PDF AI to summarize
          for you.
        </p>
        <button>Get started -{">"}</button>
      </section>
    </div>
  );
};

export default HeroSection;
