import React from "react";
import styles from "./HeroSection.module.css";
import heroImage1 from "./../../assets/pdf.png.png"
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

        <div className={styles.heroSectionImg}>
          <img src={heroImage1}  data-aos="fade-up" data-aos-once="true"></img>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
