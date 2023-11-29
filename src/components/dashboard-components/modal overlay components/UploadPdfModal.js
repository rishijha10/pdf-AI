import React, { useContext, useRef, useState } from "react";
import styles from "./UploadPdfModal.module.css";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../../../store/MainContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase";
const UploadPdfModal = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  const fileRef = useRef(null);
  function filtInputHandler() {
    fileRef.current.click(); //clicks the input type file to open file window when section box is clicked
  }
  const ctxMain = useContext(MainContext);
  let data; //stores data of uploaded pdf
  function checkDuplicateFileName(name) {
    for (let i = 0; i < ctxMain?.allFileNames.length; i++) {
      if (ctxMain.allFileNames[i] === name) {
        return false;
      }
    }
    return true;
  }
  function fileSubmitHandler(e) {
    e.preventDefault();
    if (!pdfFile) {
      return;
    }
    if (!checkDuplicateFileName(pdfFile.name)) {
      return alert("A file by this name already exists in the current folder");
    }
    const fileRef = ref(storage, `pdfs/${ctxMain?.user?.uid}/${pdfFile.name}`);
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
        uid: ctxMain?.user?.uid,
        path: ctxMain.currentPath,
      };
      getDownloadURL(snapshot.ref)
        .then(async (url) => {
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
        })
        .catch((e) => console.error(e));
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
    ctxMain.setIsUploadPdfOpen(false);
    setPdfFile(null);
    // uploadBytes(fileRef, pdfFile).then((snapshot) => {
    //   // getDownloadURL(snapshot.ref).then((url) => setFileUrl(url));
    //   console.log("Uploaded pdf: ", snapshot);
    // });
  }

  return (
    <>
      {ctxMain.isUploadPdfOpen && (
        <div className={styles.modalContainer}>
          <p>Upload document</p>
          <section className={styles.uploadSection} onClick={filtInputHandler}>
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
      )}
    </>
  );
};

export default UploadPdfModal;
