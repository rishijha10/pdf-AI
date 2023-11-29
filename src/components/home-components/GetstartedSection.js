import React from "react";
import styles from "./GetStartdedSection.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../../store/MainContext";
const GetstartedSection = () => {
  const ctxMain = useContext(MainContext);
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h1>
          Begin your Generative AI journey with <br />
          your data.
        </h1>
        <NavLink
          to={
            ctxMain.user
              ? `/dashboard/${ctxMain.user?.uid}`
              : `/auth?mode=SignIn`
          }
        >
          <button>Get started -{">"}</button>
        </NavLink>
      </div>
    </div>
  );
};

export default GetstartedSection;
