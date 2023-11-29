// import React from "react";
import styles from "./Trial.module.css";
import pdfFile from "../../assets/Lion.pdf";
import zz from "../../assets/zz.pdf";
import React, { useContext, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MainContext } from "../../store/MainContext";
import { FaUser } from "react-icons/fa6";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
// const Trial = () => {
//   return (
//     <div className={styles.container}>
//       {/* <Document file={pdfFile}>
//         <Page pageNumber={1} />
//       </Document> */}
//       <div className={styles.inner}>
//         <iframe src={pdfFile} width="100%" height="100%"></iframe>
//       </div>
//     </div>
//   );
// };

// export default Trial;

// Create Document Component
// const Trial = () => (
//   <div className={styles.container}>
//     <div className={styles.inner}>
//        <PDFViewer style={{ marginTop: "90px" }}>
//      <Document file={pdfFile}>
//        <Page size="A4" style={styles.page}>
//        </Page>
//      </Document>
//   </PDFViewer>
//     </div>
//   </div>
// );
// export default Trial;

const Trial = () => {
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
  // const [messages, setMessages] = useState([]);
  // const [currentQuestion, setcurrentQuestion] = useState(""); //used to store the current question that was asked, it will be displayed on the screen
  // const [currentAnswer, setCurrentAnswer] = useState(""); //used to store the current answer that was returned, it will be displayed on the screen
  // console.log("Messages ", messages);
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
    // const response = await fetch(`http://localhost:8000/trial/${text}`);

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
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          {/* <iframe width={"100%"} height={"100%"} src={`${zz}#toolbar=0`} /> */}
          <iframe
            width={"100%"}
            height={"100%"}
            // src="https://www.ndvsu.org/images/StudyMaterials/LPM/Cat.pdf"
            src={
              urlObject?.data?.fileUrl
                ? `${urlObject?.data?.fileUrl}#toolbar=0`
                : `https://www.ndvsu.org/images/StudyMaterials/LPM/Cat.pdf#toolbar=0 `
            }
          />
        </div>
        <div className={styles.innerRight}>
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
            <form className={styles.promptForm} onSubmit={submitPromptHandler}>
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
      </div>
    </div>
  );
};

export default Trial;
