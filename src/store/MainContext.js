import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const MainContext = createContext(null);

const MainContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [currentFolder, setCurrentFolder] = useState("root");
  const [userFolders, setUserFolders] = useState([]);
  const [userFiles, setUserFiles] = useState([]);
  const [adminFolders, setAdminFolders] = useState([]);
  const [adminFiles, setAdminFiles] = useState([]);
  async function getData(uid, fileName, type) {
    try {
      const docRef = collection(db, `${fileName}`);
      if (type === "folder") {
        const q = query(docRef, where("userId", "==", uid));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        const folderData = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          folderData.push({ data: doc.data(), docId: doc.id });
          // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
        });
        setUserFolders(folderData);
      } else {
        console.log("Current path: ", currentFolder);
        const q = query(
          docRef,
          where("uid", "==", uid),
          where("path", "==", currentFolder)
        );
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        const filesData = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          filesData.push({ data: doc.data(), docId: doc.id });
          // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
        });
        setUserFiles(filesData);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // console.log("Users email id is ", user?.email);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        });
        getData(user.uid, "Folders", "folder");
        // getData(user.uid, "Pdf-Files", "files");
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    getData(user.uid, "Pdf-Files", "files");
  }, [currentFolder]);
  console.log("User folders: ", userFolders);
  console.log("User files: ", userFiles);

  return (
    <MainContext.Provider
      value={{
        userFolders,
        setUserFolders,
        user,
        currentFolder,
        setCurrentFolder,
        userFiles,
        setUserFiles,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
