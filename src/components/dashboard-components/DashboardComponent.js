import React, { useState } from "react";
import styles from "./DashboardComponent.module.css";
import SubBar from "./SubBar";
import DashboardItems from "./DashboardItems";
import CreateFolderModal from "./modal overlay components/CreateFolderModal";
import { useContext } from "react";
import { MainContext } from "../../store/MainContext";
import ModalOverlay from "./modal overlay components/ModalOverlay";
import UploadPdfModal from "./modal overlay components/UploadPdfModal";
import ConfirmDeleteModal from "./modal overlay components/ConfirmDeleteModal";
const DashboardComponent = () => {
  const ctxMain = useContext(MainContext);
  const [deleteType, setDeleteType] = useState("");
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false); //used to open and close create folder modal
  // const [isUploadPdfOpen, setIsUploadPdfOpen] = useState(false); //used to open and close upload pdf modal
  return (
    <div className={styles.outerContainer}>
      {/* <ModalOverlay /> */}
      <SubBar
        isCreateFolderOpen={isCreateFolderOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
        showCreateFolderBtn={true}
      />
      <DashboardItems
        // title={"Folders"}
        items={ctxMain.userFiles}
        type={"file"}
        setDeleteType={setDeleteType}
      />
      <DashboardItems
        // title={"Folders"}
        type={"folder"}
        items={ctxMain.userFolders}
        setDeleteType={setDeleteType}
      />

      {isCreateFolderOpen && (
        <ModalOverlay
          isCreateFolderOpen={isCreateFolderOpen}
          setIsCreateFolderOpen={setIsCreateFolderOpen}
        >
          <CreateFolderModal
            isCreateFolderOpen={isCreateFolderOpen}
            setIsCreateFolderOpen={setIsCreateFolderOpen}
          />
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
