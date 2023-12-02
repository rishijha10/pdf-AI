import React, { useEffect, useState } from "react";
import styles from "./DashboardComponent.module.css";
import SubBar from "./SubBar";
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
  const [deleteType, setDeleteType] = useState("");
  const [rootFiles, setRootFiles] = useState([]);
  async function getFileByPathRoot() {
    //get all files that are not inside a folder, they have path set to root
    const docRef = collection(db, "Pdf-Files");
    const q = query(
      docRef,
      where("uid", "==", ctxMain.user.uid),
      where("path", "==", "root")
    );
    const querySnapshot = await getDocs(q);
    const filesData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      filesData.push({ data: doc.data(), docId: doc.id });
      // ctxMain.setUserFolders((prev) => [...prev, doc.data()]);
    });
    setRootFiles(filesData);
  }
  useEffect(() => {
    getFileByPathRoot();
  }, []);
  return (
    <div className={styles.outerContainer}>
      {/* <ModalOverlay /> */}
      {/* <SubBar
        isCreateFolderOpen={isCreateFolderOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
        showCreateFolderBtn={true}
      /> */}
      <DashboardItems
        // title={"Folders"}
        items={rootFiles}
        type={"file"}
        setDeleteType={setDeleteType}
      />
      <DashboardItems
        items={ctxMain.userFolders}
        type="folder"
        setDeleteType={setDeleteType}
      />
      {/* <DashboardItems
        // title={"Folders"}
        type={"folder"}
        items={ctxMain.userFolders}
        setDeleteType={setDeleteType}
      /> */}

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
          <ConfirmDeleteModal type={deleteType} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default DashboardComponent;
