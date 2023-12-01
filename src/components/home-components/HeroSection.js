import React, { useContext } from "react";
import styles from "./HeroSection.module.css";
import heroImage1 from "./../../assets/pdf.png.png";
import { NavLink } from "react-router-dom";
import { MainContext } from "../../store/MainContext";
const HeroSection = () => {
  const ctxMain = useContext(MainContext);
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
        {/* <NavLink
          to={
            ctxMain.user
              ? `/dashboard/${ctxMain.user?.uid}`
              : `/auth?mode=SignIn`
          }
        > */}
        <NavLink to={ctxMain.user ? `/pdf-ai-gen1/start` : `/auth?mode=signIn`}>
          <button>Get started -{">"}</button>
        </NavLink>

        <div className={styles.heroSectionImg}>
          <img
            src={heroImage1}
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-duration="1000"
          ></img>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
