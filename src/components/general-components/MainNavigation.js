import React, { useContext, useEffect, useState } from "react";
import styles from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { MainContext } from "../../store/MainContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const MainNavigation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollPosition > 100;
  const ctxMain = useContext(MainContext);
  function signOutUser() {
    signOut(auth)
      .then(console.log("Signout successful"))
      .catch((err) => console.log(err));
  }
  // {`${isScrolled ? styles.black : undefined}`}
  // ${
  //   isScrolled ? styles.black : undefined
  // }
  return (
    <div
      className={`${styles.container} ${isScrolled ? styles.white : undefined}`}
    >
      <div className={styles.innerContainer}>
        <section className={styles.logo}>
          <div
            className={`${styles.first} ${
              isScrolled ? styles.trial : undefined
            }`}
          ></div>
          <div
            className={`${styles.second} ${
              isScrolled ? styles.trial : undefined
            }`}
          ></div>
          <div
            className={`${styles.third} ${
              isScrolled ? styles.trial : undefined
            }`}
          ></div>
          <Link to="/">
            <p className={` ${isScrolled ? styles.black : styles.defaultLogo}`}>
              OfficeGPT
            </p>
          </Link>
        </section>
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
          {ctxMain.userAuth ? (
            <>
              <p>{ctxMain.userAuth}</p>
              <button onClick={signOutUser}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/auth?mode=signIn">
                <button>
                  <span>Log in</span>
                </button>
              </Link>
              <NavLink to="/auth?mode=signUp">
                <button className={styles.vibrant}>Get Started For Free</button>
              </NavLink>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default MainNavigation;
