import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const MainContext = createContext(null);
const MainContextProvider = (props) => {
  const [isUploadPdfOpen, setIsUploadPdfOpen] = useState(false); //used to open and close pdf modal
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false); //used to open and close create folder modal
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [currentPath, setCurrentPath] = useState("root"); //currentFolder changed to currentPath
  const [userFolders, setUserFolders] = useState([]); //stores all of users folders
  const [allUserFiles, setAllUserFiles] = useState([]); //stores all files of the user
  const [userFiles, setUserFiles] = useState([]); //stores the files inside a particular folder
  const [currentDocument, setCurrentDocument] = useState({});
  const [allFileNames, setAllFileNames] = useState([]); //stores the names of every file that of the user
  console.log("Current document ", currentDocument);
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
      } else if (type === "files") {
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
      } else if (type === "all files") {
        const q = query(docRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot);
        const filesData = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          filesData.push({ data: doc.data(), docId: doc.id });
          // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
        });
        // Use map to extract the 'name' property from each object
        const newFilesData = filesData.map((item) => item.data.name);
        console.log("File names: ", newFilesData);
        setAllFileNames(newFilesData);
      } else if (type === "all user files") {
        const q = query(docRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const filesData = [];
        querySnapshot.forEach((doc) => {
          filesData.push({ data: doc.data(), docId: doc.id });
        });
        setAllUserFiles(filesData);
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
        getData(user?.uid, "Pdf-Files", "all files");
        getData(user?.uid, "Pdf-Files", "files");
        getData(user?.uid, "Pdf-Files", "all user files");
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
  console.log("All user files ", allFileNames);
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
        allFileNames,
        setAllFileNames,
        isCreateFolderOpen,
        setIsCreateFolderOpen,
        allUserFiles,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
