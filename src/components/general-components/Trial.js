// import React from "react";
import styles from "./Trial.module.css";
import pdfFile from "../../assets/zz.pdf";
import React, { useContext, useState } from "react";
import { IoIosSend } from "react-icons/io";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { DocumentReference, addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { MainContext } from "../../store/MainContext";
import { FaUser } from "react-icons/fa6";

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
  const ctxMain = useContext(MainContext);
  //Stores the query written in input field
  const [queryList, setQueryList] = useState([]);
  const [promptQuery, setPromptQuery] = useState("");
  function promptHandler(e) {
    e.preventDefault();
    setPromptQuery(e.target.value);
  }
  async function submitPromptHandler(e) {
    e.preventDefault();
    if (promptQuery === "") {
      return;
    }
    setQueryList([...queryList, promptQuery]);
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
  console.log("This is the query ", promptQuery);
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.innerLeft}>
          <iframe width={"100%"} height={"100%"} src={pdfFile} />
        </div>
        <div className={styles.innerRight}>
          <section className={styles.upperSection}>
            <div className={styles.userQuery}>
              <FaUser className={styles.userIcon} />
              <p>Please explain</p>
            </div>
            <div></div>
            {/* {queryList.map((query) => {
              return (
                <div className={styles.userQuery}>
                  <FaUser className={styles.userIcon} />
                  <p>{query}</p>
                </div>
              );
            })} */}
          </section>
          <section className={styles.lowerSection}>
            <form className={styles.promptForm} onSubmit={submitPromptHandler}>
              <IoIosSend
                className={styles.sendIcon}
                onClick={submitPromptHandler}
              />
              <input
                placeholder="Enter your question (max 1,000 words)"
                name="prompt"
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
