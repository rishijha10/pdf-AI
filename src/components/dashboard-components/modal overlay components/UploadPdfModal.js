import React, { useContext, useRef, useState } from "react";
import styles from "./UploadPdfModal.module.css";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../../../store/MainContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase";
const UploadPdfModal = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  const ctxMain = useContext(MainContext);
  let data;
  function fileSubmitHandler(e) {
    e.preventDefault();
    if (!pdfFile) {
      return;
    }
    const fileRef = ref(storage, `pdfs/${pdfFile.name + v4()}`);
    console.log(pdfFile.name);
    uploadBytes(fileRef, pdfFile).then(async (snapshot) => {
      // const data = {
      //   createdAt: snapshot.metadata.timeCreated,
      //   lastAccessed: new Date(),
      //   name: snapshot.metadata.name,
      //   uid: ctxMain.user.uid,
      //   path: ctxMain.currentFolder,
      // };
      // getDownloadURL(snapshot.ref).then(async (url) => {
      //   data.url = { url };
      //   try {
      //     const docRef = await addDoc(collection(db, "Pdf-Files"), data);
      //     console.log("Document written with ID: ", docRef.id);
      //     ctxMain.setUserFiles((prev) => [
      //       ...prev,
      //       { data: data, docId: data.name },
      //     ]);
      //     return docRef.id;
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
      // });
      data = {
        createdAt: snapshot.metadata.timeCreated,
        lastAccessed: new Date(),
        name: snapshot.metadata.name,
        uid: ctxMain.user.uid,
        path: ctxMain.currentFolder,
        // url: url,
      };
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log("url: ", url);
        data.fileUrl = url;
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
      // console.log(url);
      // data = {
      //   createdAt: snapshot.metadata.timeCreated,
      //   lastAccessed: new Date(),
      //   name: snapshot.metadata.name,
      //   uid: ctxMain.user.uid,
      //   path: ctxMain.currentFolder,
      //   // url: url,
      // };
      // try {
      //   const docRef = await addDoc(collection(db, "Pdf-Files"), data);
      //   console.log("Document written with ID: ", docRef.id);
      //   ctxMain.setUserFiles((prev) => [
      //     ...prev,
      //     { data: data, docId: data.name },
      //   ]);
      //   return docRef.id;
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
    });
    // uploadBytes(fileRef, pdfFile).then((snapshot) => {
    //   // getDownloadURL(snapshot.ref).then((url) => setFileUrl(url));
    //   console.log("Uploaded pdf: ", snapshot);
    // });
  }

  const fileRef = useRef(null);
  function filtInputHandler() {
    fileRef.current.click();
  }

  return (
    <div className={styles.modalContainer}>
      <p>Upload document</p>
      <section
        className={styles.uploadSection}
        onClick={filtInputHandler}
        // onmouseover={filtInputHandler()}
      >
        <p>{pdfFile?.name}</p>
      </section>
      <IoClose
        className={styles.closeIcon}
        onClick={() => ctxMain.setIsUploadPdfOpen(false)}
      />
      <form onSubmit={fileSubmitHandler}>
        <input
          type="file"
          name="pdfFile"
          ref={fileRef}
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPdfModal;
