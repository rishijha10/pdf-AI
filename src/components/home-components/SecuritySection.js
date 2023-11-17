import React from "react";
import styles from "./SecuritySection.module.css";
import iconOne from "./../../assets/Untitled design (1).png"
const SecuritySection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.threeCards}>
            <img src={iconOne}></img>
            <hr className={styles.hrLine}/>
        </div>
        <div className={styles.threeCards}></div>
        <div className={styles.threeCards}></div>
      </div>
    </div>
  );
};

export default SecuritySection;
