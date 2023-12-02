// import React from "react";
import styles from "./DocumentAiComponent.module.css";
import pdfFile from "../../assets/Lion.pdf";
import zz from "../../assets/zz.pdf";
import dummy_pdf from "../../assets/Introduction to quantum mechanics.pdf";
import { FaRegFilePdf } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowDroprightCircle, IoIosSend } from "react-icons/io";
import { MainContext } from "../../store/MainContext";
import { FaUser } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import DashboardComponent from "../dashboard-components/DashboardComponent";
import { MdOutlineSearch } from "react-icons/md";
import MainNavigation from "../general-components/MainNavigation";
// import { RiUploadCloud2Line } from "react-icons/ri";
// import UploadButton from "./UploadButton";

const DocumentAiComponent = () => {
  const [sidebarWidth, setSidebarWidth] = useState("20%");
  function sidebarWidthHandler() {
    sidebarWidth === "20%" ? setSidebarWidth("0%") : setSidebarWidth("20%");
  }
  const { pdfUrl } = useParams();
  console.log("Pdf url ", pdfUrl);
  const ctxMain = useContext(MainContext);
  const urlObject = ctxMain.userFiles.find((item) => item.data.name === pdfUrl);
  console.log(urlObject);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ctxMain?.user?.email) {
      navigate("/auth?mode=signIn");
    }
  }, [ctxMain?.user?.email, navigate]);

  const [queryList, setQueryList] = useState([]); //stores the objects of questions and answers in pair
  const [promptQuery, setPromptQuery] = useState(""); //Stores the question written in input field
  function promptHandler(e) {
    e.preventDefault();
    setPromptQuery(e.target.value);
  }
  // console.log("Query list: ", queryList);
  async function submitPromptHandler(e) {
    e.preventDefault();
    if (promptQuery === "") {
      return;
    }

    const text = promptQuery;
    setPromptQuery("");
    fetch("https://genai-video-analyzer-rrcr7xvxjq-uc.a.run.app/api/chat", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ urls: [], question: text }),
    })
      .then((res) => res.json())
      .then((data) =>
        setQueryList((prevQueries) => [
          ...prevQueries,
          { author: text, bot: data.answer },
        ])
      );
    // const response = await fetch(`http://localhost:8000/DocumentAiComponent/${text}`);

    // const data = await response.json();

    // console.log("data: ", data);
    // setMessages([
    //   ...messages,
    //   {
    //     author: data.messages[0].content,
    //     bot: data.candidates[0].content,
    //   },
    // ]);
    // setPromptQuery("");
    // promptRef.current.value = "";
    // setQueryList([
    //   ...queryList,
    //   {
    //     question: promptQuery,
    //     answer:
    //       "The connection to our AI endpoint is currently unavailable; please attempt your request again later.",
    //   },
    // ]);
    // const messageRef = doc(db, "users", `${ctxMain.userId}`, "chats", "hello");
    // const docRef = await addDoc(collection(db, `users/${ctxMain.userId}/chats}`))
    // const chatCollectionRef = db
    //   .collection("users")
    //   .doc(`${ctxMain.userId}`)
    //   .collection("chats");
    // await addDoc(chatCollectionRef, {
    //   message: promptQuery,
    // });
    // chatCollectionRef.document({

    // })
    // const usersCollectionRef = db
    //   .collection("users")
    //   .document(`${ctxMain.userId}`);
    // const chatCollectionRef = usersCollectionRef.collection("chats");
    // chatCollectionRef.document("chats").set({ "By User": promptQuery });

    // chatCollectionRef.document()
    // await setDoc(doc(db, "users", ctxMain.userId), {

    // })
    // await setDoc(doc(db, "chats"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });
    // addDoc(chatCollectionRef, )
  }
  // console.log("This is the query ", promptQuery);
  return (
    <div className={styles.container}>
      <MainNavigation onDocumentAiPage={true} />
      <div className={styles.inner}>
        <div
          className={styles.fileSection}
          style={{ width: `${sidebarWidth}` }}
        >
          {/* <p className={styles.arrow}>{'>'}</p> */}
          <div className={styles.searchBar}>
            <input
              type="text"
              id="file-search"
              placeholder="Search file name."
            />
            <MdOutlineSearch className={styles.searchIcon} />
          </div>
          <DashboardComponent />
        </div>
        {/* <p className={styles.arrow} onClick={sidebarWidthHandler}>{'>'}</p> */}
        <IoIosArrowDroprightCircle
          className={styles.arrow}
          onClick={sidebarWidthHandler}
        />
        <section className={styles.chatHolder}>
          <div className={styles.pdfSection}>
            {/* <iframe width={"100%"} height={"100%"} src={`${zz}#toolbar=0`} /> */}
            {/* <iframe
            width={"100%"}
            height={"100%"}
            // src="https://www.ndvsu.org/images/StudyMaterials/LPM/Cat.pdf"
            // #zoom=FitH#toolbar=0
            src={
              urlObject?.data?.fileUrl ? `${urlObject?.data?.fileUrl}` : null
            }
            // `${dummy_pdf}#toolbar=0`
          /> */}
            {urlObject?.data?.fileUrl ? (
              <iframe
                width={"100%"}
                height={"100%"}
                // src="https://www.ndvsu.org/images/StudyMaterials/LPM/Cat.pdf"
                // #zoom=FitH#toolbar=0
                src={`${urlObject?.data?.fileUrl}#toolbar=0&navpanes=0`}
                // `${dummy_pdf}#toolbar=0`
              />
            ) : (
              <div className={styles.noFileSelected}>
                <FaRegFilePdf className={styles.pdfIcon} />
                <h2>No pdf/document selected</h2>
              </div>
            )}
          </div>
          <div className={styles.botSection}>
            <section className={styles.upperSection}>
              {/* <div className={styles.userQuery}>
              <FaUser className={styles.userIcon} />
              <p>Please explain</p>
            </div>
            <div className={styles.userQuery}>
              <section className={styles.logo}>
                <div className={`${styles.first} `}></div>
                <div className={`${styles.second}`}></div>
                <div className={`${styles.third} `}></div>
              </section>
              <p>
                React has been designed from the start for gradual adoption. You
                can use as little or as much React as you need. Whether you want
                to get a taste of React, add some interactivity to an HTML page,
                or start a complex React-powered app, this section will help you
                get started.
              </p>
            </div> */}
              {/* {queryList.map((query) => {
              return (
                <>
                  <div className={styles.userQuery}>
                    <FaUser className={styles.userIcon} />
                    <p>{query.question}</p>
                  </div>
                  <div className={styles.userQuery}>
                    <section className={styles.logo}>
                      <div className={`${styles.first} `}></div>
                      <div className={`${styles.second}`}></div>
                      <div className={`${styles.third} `}></div>
                    </section>
                    <p>{query.answer}</p>
                  </div>
                </>
              );
            })} */}
              {queryList.map((query) => {
                return (
                  <>
                    <div className={styles.userQuery}>
                      <FaUser className={styles.userIcon} />
                      <p>{query?.author}</p>
                    </div>
                    <div className={`${styles.userQuery} ${styles.botQuery}`}>
                      <section className={styles.logo}>
                        <div className={`${styles.first} `}></div>
                        <div className={`${styles.second}`}></div>
                        <div className={`${styles.third} `}></div>
                      </section>
                      <p>{query?.bot}</p>
                    </div>
                  </>
                );
              })}
            </section>
            <section className={styles.lowerSection}>
              <form
                className={styles.promptForm}
                onSubmit={submitPromptHandler}
              >
                <IoIosSend
                  className={styles.sendIcon}
                  onClick={submitPromptHandler}
                />
                <input
                  placeholder="Enter your question (max 1,000 words)"
                  autoComplete="off"
                  name="prompt"
                  value={promptQuery}
                  onChange={promptHandler}
                />
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DocumentAiComponent;
