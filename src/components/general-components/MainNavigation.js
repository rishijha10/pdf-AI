import React, { useContext, useEffect, useState } from "react";
import styles from "./MainNavigation.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MainContext } from "../../store/MainContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { RiUploadCloud2Line } from "react-icons/ri";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TiArrowBack } from "react-icons/ti";
import { MdArrowBackIos } from "react-icons/md";

const MainNavigation = (props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function hamburgerHandler() {
    setIsOpen(true);
  }
  function crossHandler() {
    setIsOpen(false);
  }
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
      // .then(console.log("Signout successful"))
      .then(() => {
        ctxMain.setUser(null);
        ctxMain.setCurrentPath("root");
        ctxMain.setUserFolders([]);
        ctxMain.setUserFiles([]);
        setIsOpen(false);
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  }
  return (
    <div
      className={`${styles.container} ${isScrolled ? styles.white : undefined}`}
    >
      <div className={styles.innerContainer}>
        {/* {props.onDocumentAiPage || ( */}
        {props.onDocumentAiPage && (
          <div className={styles.goBack}>
            <Link to="/">
              <TiArrowBack className={styles.goBackIcon} />
            </Link>
            <p>|</p>
          </div>
        )}
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
        {/* )} */}

        {props.onDocumentAiPage || (
          <nav className={styles.navLinks}>
            <ul>
              <li>Product</li>
              <li>Solution</li>
              <li>Pricing</li>
              <li>Resources</li>
              <li>Partners</li>
            </ul>
          </nav>
        )}
        <section className={styles.navButtons}>
          {ctxMain?.user?.email ? (
            <>
              {props.onDocumentAiPage && ( //only display on document ai page
                <>
                  <button
                    onClick={() => ctxMain.setIsCreateFolderOpen(true)}
                    className={styles.createBtn}
                  >
                    Create folder
                  </button>
                  <button
                    className={styles.uploadBtn}
                    onClick={() => {
                      ctxMain.setCurrentPath("root");
                      ctxMain.setIsUploadPdfOpen(true);
                    }}
                  >
                    Upload <RiUploadCloud2Line className={styles.uploadIcon} />
                  </button>
                </>
              )}
              {!props.onDocumentAiPage && (
                // dont show this when document ai page is open
                <div className={styles.logoutDiv}>
                  <Link to={`/auth?mode=signIn`}>
                    <p
                      className={` ${
                        isScrolled ? styles.white : styles.defaultLogo
                      }`}
                    >
                      {ctxMain.user?.email}
                    </p>
                  </Link>
                  <button onClick={signOutUser}>Log out</button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/auth?mode=signIn">
                <button className={styles.loginBtn}>
                  <span>Log in</span>
                </button>
              </Link>
              <NavLink to="/auth?mode=signUp">
                <button className={styles.vibrant}>Get Started For Free</button>
              </NavLink>
            </>
          )}
          <HiMenu className={styles.hamburgerIcon} onClick={hamburgerHandler} />

          {isOpen && (
            <div
              className={styles.dropDown}
              data-aos="fade-right"
              data-aos-duration="400"
              data-aos-once="true"
              data-aos-easing="ease-in-out"
            >
              <div className={styles.dropInnercontainer}>
                <div className={styles.cross}>
                  <div className={styles.logo_full}>
                    <section className={styles.logo}>
                      <div className={styles.first}></div>
                      <div className={styles.second}></div>
                      <div className={styles.third}></div>
                    </section>
                    <p>OfficeGPT</p>
                  </div>
                  <RxCross2
                    className={styles.closeMenu}
                    onClick={crossHandler}
                  />
                </div>
                <div className={styles.menuList}>
                  <div className={styles.upNavBtn}>
                    <ul className={styles.dropDownLi}>
                      <li>Product</li>
                      <li>Solution</li>
                      <li>Pricing</li>
                      <li>Resources</li>
                      <li>Partners</li>
                    </ul>
                  </div>
                  {ctxMain?.user ? (
                    <div className={styles.downNavBtn}>
                      <div className={styles.dropDownLogout}>
                        <Link to={`/auth?mode=signIn`}>
                          <p
                            className={` ${
                              isScrolled ? styles.white : styles.defaultLogo
                            }`}
                          >
                            {ctxMain.user?.email}
                          </p>
                        </Link>
                        <button onClick={signOutUser}>Log out</button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.downNavBtn}>
                      <li style={{ listStyle: "none" }}>
                        <Link to="/auth?mode=signIn">
                          <button className={styles.loginBtn}>
                            <span>Log in</span>
                          </button>
                        </Link>
                      </li>
                      <li style={{ listStyle: "none" }}>
                        <NavLink to="/auth?mode=signUp">
                          <button className={styles.vibrant}>
                            Get Started For Free
                          </button>
                        </NavLink>
                      </li>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MainNavigation;
