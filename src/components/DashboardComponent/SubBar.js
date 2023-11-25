import React, { useState } from "react";
import styles from "./SubBar.module.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from "react";
import { MainContext } from "../../store/MainContext";
import { db } from "../../firebase/firebase";
const SubBar = (props) => {
  const [fileName, setFileName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const ctxMain = useContext(MainContext);
  const storage = getStorage();
  function fileSubmitHandler(e) {
    e.preventDefault();
    if (!pdfFile) {
      return;
    }
    const fileRef = ref(storage, `pdfs/${pdfFile.name + v4()}`);
    console.log(pdfFile.name);
    uploadBytes(fileRef, pdfFile).then(async (snapshot) => {
      const data = {
        createdAt: snapshot.metadata.timeCreated,
        lastAccessed: new Date(),
        name: snapshot.metadata.name,
        uid: ctxMain.user.uid,
        path: ctxMain.currentFolder,
      };
      try {
        const docRef = await addDoc(collection(db, "Pdf-Files"), data);
        console.log("Document written with ID: ", docRef.id);
        ctxMain.setUserFiles((prev) => [
          ...prev,
          { data: data, docId: data.name },
        ]);
        return docRef.id;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
    // uploadBytes(fileRef, pdfFile).then((snapshot) => {
    //   // getDownloadURL(snapshot.ref).then((url) => setFileUrl(url));
    //   console.log("Uploaded pdf: ", snapshot);
    // });
  }
  return (
    <div className={styles.container}>
      <h1>Your Documents</h1>
      <ul>
        <li>
          {/* <button>Upload file</button> */}
          <form onSubmit={fileSubmitHandler}>
            <input
              type="file"
              name="pdfFile"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        </li>
        {/* <li>
          <button>Create file</button>
        </li> */}
        <li>
          <button onClick={() => props.setIsCreateFolderOpen(true)}>
            Create folder
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SubBar;
