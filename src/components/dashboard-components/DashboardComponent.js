import React, { useEffect, useState } from "react";
import styles from "./DashboardComponent.module.css";
import DashboardItems from "./DashboardItems";
import CreateFolderModal from "./modal overlay components/CreateFolderModal";
import { useContext } from "react";
import { MainContext } from "../../store/MainContext";
import ModalOverlay from "./modal overlay components/ModalOverlay";
import UploadPdfModal from "./modal overlay components/UploadPdfModal";
import ConfirmDeleteModal from "./modal overlay components/ConfirmDeleteModal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
const DashboardComponent = () => {
  const ctxMain = useContext(MainContext);
  const [rootFiles, setRootFiles] = useState([]);
  async function getFileByPathRoot() {
    //get all files that are not inside a folder, they have path set to root
    try {
      const docRef = collection(db, "Pdf-Files");
      const q = query(
        docRef,
        where("uid", "==", ctxMain.user.uid),
        where("path", "==", "root")
      );
      const querySnapshot = await getDocs(q);
      const filesData = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        filesData.push({ data: doc.data(), docId: doc.id });
      });
      setRootFiles(filesData);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getFileByPathRoot();
  }, [ctxMain.userFiles]);
  return (
    <div className={styles.outerContainer}>
      <DashboardItems items={rootFiles} type={"file"} />
      <DashboardItems items={ctxMain.userFolders} type="folder" />
      {ctxMain.isCreateFolderOpen && (
        <ModalOverlay>
          <CreateFolderModal />
        </ModalOverlay>
      )}
      {ctxMain.isUploadPdfOpen && (
        <ModalOverlay>
          <UploadPdfModal />
        </ModalOverlay>
      )}
      {ctxMain.confirmDeleteModalOpen && (
        <ModalOverlay>
          <ConfirmDeleteModal
            rootPathFiles={rootFiles}
            rootPathFilesHandler={(updatedFiles) => setRootFiles(updatedFiles)}
          />
        </ModalOverlay>
      )}
    </div>
  );
};

export default DashboardComponent;
