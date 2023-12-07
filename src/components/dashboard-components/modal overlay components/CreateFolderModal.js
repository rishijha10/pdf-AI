import React, { useContext, useState } from "react";
import styles from "./CreateFolderModal.module.css";
import { MainContext } from "../../../store/MainContext";
import { db } from "../../../firebase/firebase";
import { IoClose } from "react-icons/io5";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
const CreateFolderModal = (props) => {
  const ctxMain = useContext(MainContext);
  const [fileName, setFileName] = useState(""); //stores name of file entered in input
  async function getAllFolders() {
    const docRef = collection(db, "Folders");
    const q = query(docRef, where("userId", "==", ctxMain.user.uid));
    const querySnapshot = await getDocs(q);
    const folderData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      folderData.push({ data: doc.data(), docId: doc.id });
      // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
    });
    ctxMain.setUserFolders(folderData);
  }
  // useEffect(() => {
  //   getAllFolders();
  // }, []);
  async function submitHandler(e) {
    e.preventDefault();
    if (fileName.length > 3) {
      const isOkay = checkDuplicateFolderName(fileName); //checks to see if a folder by this name already exists
      if (isOkay) {
        const data = {
          createdAt: new Date(),
          createdBy: ctxMain.user.displayName,
          lastAccessed: null,
          name: fileName,
          parent: ctxMain.currentPath,
          path: ctxMain.currentPath === "root" ? [] : ["Parent folder path!"],
          userId: ctxMain.user.uid,
          updatedAt: new Date(),
        };
        addToFirestore(data).then((id) => {
          getAllFolders();
          // console.log("Document id: ", id); //adds current data to firestore database and returns its docId
          // ctxMain.setUserFolders((prev) => [...prev, { data:[
          //   createdAt:
          // ], docId: id }]); //puts the folder into the UserFolders list
          alert(`${fileName} created`);
        });
      } else {
        alert("Folder by this name already exists");
        return;
      }
      ctxMain.setIsCreateFolderOpen(false);
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
      await getAllFolders();
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
        onClick={() => ctxMain.setIsCreateFolderOpen(false)}
      />
    </div>
  );
};

export default CreateFolderModal;
