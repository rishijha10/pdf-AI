import React, { useContext, useEffect, useState } from "react";
import styles from "./CreateFolderModal.module.css";
import { MainContext } from "../../../store/MainContext";
import { db } from "../../../firebase/firebase";
import { IoClose } from "react-icons/io5";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
const CreateFolderModal = (props) => {
  const ctxMain = useContext(MainContext);
  const [fileName, setFileName] = useState(""); //stores name of file entered in input
  useEffect(() => {
    // console.log(ctxMain.user.uid);
    // if (ctxMain.user.uid) {
    //   getData(ctxMain.user.uid);
    // }
    // getData(ctxMain.user.uid);
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    if (fileName.length > 3) {
      const isOkay = checkDuplicateFolderName(fileName); //checks to see if a folder by this name already exists
      if (isOkay) {
        const data = {
          createdAt: new Date(),
          createdBy: ctxMain.user.displayName,
          lastAccessed: null,
          name: fileName,
          parent: ctxMain.currentFolder,
          path: ctxMain.currentFolder === "root" ? [] : ["Parent folder path!"],
          userId: ctxMain.user.uid,
          updatedAt: new Date(),
        };
        const docId = addToFirestore(data); //adds current data to firestore database and returns its docId
        ctxMain.setUserFolders((prev) => [...prev, { data, docId }]); //puts the folder into the UserFolders list
        alert(`${fileName} created`);
      } else {
        alert("Folder by this name already exists");
        return;
      }
      props.setIsCreateFolderOpen(false);
    } else {
      alert("Folder name must be atleast 3 characters");
    }
  }
  function checkDuplicateFolderName(name) {
    for (let i = 0; i < ctxMain.userFolders.length; i++) {
      if (ctxMain.userFolders[i].data.name === name) {
        return false;
      }
    }
    return true;
  }
  async function addToFirestore(data) {
    try {
      const docRef = await addDoc(collection(db, "Folders"), data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // async function getData(uid) {
  //   try {
  //     const docRef = collection(db, "Folders");
  //     const q = query(docRef, where("userId", "==", uid));
  //     const querySnapshot = await getDocs(q);
  //     console.log(querySnapshot);
  //     const folderData = [];
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //       folderData.push(doc.data());
  //       // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
  //     });
  //     ctxMain.setUserFolders(folderData);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // getData(ctxMain.user.uid);
  return (
    <>
      {props.isCreateFolderOpen && (
        <div className={styles.modalContainer}>
          <h2>Create a folder</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="folder-name"
              value={fileName}
              placeholder="Folder name"
              onChange={(e) => setFileName(e.target.value)}
            />
            <button type="submit" onClick={submitHandler}>
              Create
            </button>
            {/* <button onClick={() => props.setIsCreateFolderOpen(false)}>
              Close
            </button> */}
          </form>
          <IoClose
            className={styles.closeIcon}
            onClick={() => props.setIsCreateFolderOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default CreateFolderModal;
