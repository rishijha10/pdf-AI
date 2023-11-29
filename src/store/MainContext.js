import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const MainContext = createContext(null);
const MainContextProvider = (props) => {
  const [isUploadPdfOpen, setIsUploadPdfOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [currentPath, setCurrentPath] = useState("root"); //currentFolder changed to currentPath
  const [userFolders, setUserFolders] = useState([]); //stores all of users folders
  const [userFiles, setUserFiles] = useState([]); //stores the files inside a particular folder
  const [currentDocument, setCurrentDocument] = useState({});
  console.log("Current document ", currentDocument);
  // const []
  // const [adminFolders, setAdminFolders] = useState([]);
  // const [adminFiles, setAdminFiles] = useState([]);
  async function getData(uid, fileName, type) {
    try {
      const docRef = collection(db, `${fileName}`);
      if (type === "folder") {
        const q = query(docRef, where("userId", "==", uid));
        const querySnapshot = await getDocs(q);
        const folderData = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          folderData.push({ data: doc.data(), docId: doc.id });
          // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
        });
        setUserFolders(folderData);
      } else {
        console.log("Current path: ", currentPath);
        const q = query(
          docRef,
          where("uid", "==", uid),
          where("path", "==", currentPath)
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        });
        getData(user?.uid, "Folders", "folder");
        // getData(user.uid, "Pdf-Files", "files");
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(() => {
    getData(user?.uid, "Pdf-Files", "files");
  }, [currentPath]);
  console.log("User folders: ", userFolders);
  console.log("User files: ", userFiles);

  return (
    <MainContext.Provider
      value={{
        userFolders,
        setUserFolders,
        user,
        setUser,
        currentPath,
        setCurrentPath,
        userFiles,
        setUserFiles,
        isUploadPdfOpen,
        setIsUploadPdfOpen,
        confirmDeleteModalOpen,
        setConfirmDeleteModalOpen,
        currentDocument,
        setCurrentDocument,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
