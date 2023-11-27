import React, { useState } from "react";
import styles from "./DashboardComponent.module.css";
import SubBar from "./SubBar";
import DashboardItems from "./DashboardItems";
import CreateFolderModal from "./modal overlay components/CreateFolderModal";
import { useContext } from "react";
import { MainContext } from "../../store/MainContext";
import ModalOverlay from "./modal overlay components/ModalOverlay";
import UploadPdfModal from "./modal overlay components/UploadPdfModal";
const DashboardComponent = () => {
  const ctxMain = useContext(MainContext);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false); //used to open and close create folder modal
  // const [isUploadPdfOpen, setIsUploadPdfOpen] = useState(false); //used to open and close upload pdf modal
  // const ctxMain = useContext(MainContext)
  return (
    <div className={styles.outerContainer}>
      {/* <ModalOverlay /> */}
      <SubBar
        isCreateFolderOpen={isCreateFolderOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
        showCreateFolderBtn={true}
        // isUploadPdfOpen={ctxMain.isUploadPdfOpen}
        // IsUploadPdfOpen={ctxMain.setIsUploadPdfOpen}
      />
      <DashboardItems title={"Folders"} items={ctxMain.userFolders} />
      {/* <DashboardItems
        title={"Files"}
        items={["Files 1", "Files 2", "Files 3"]}
      /> */}
      <ModalOverlay
        isCreateFolderOpen={isCreateFolderOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
      >
        <CreateFolderModal
          isCreateFolderOpen={isCreateFolderOpen}
          setIsCreateFolderOpen={setIsCreateFolderOpen}
        />
      </ModalOverlay>
      <ModalOverlay
      // isUploadPdfOpen={ctxMain.isUploadPdfOpen}
      // setctxMain.IsUploadPdfOpen={setctxMain.IsUploadPdfOpen}
      >
        <UploadPdfModal
        // ctxMain.isUploadPdfOpen={ctxMain.isUploadPdfOpen}
        // setctxMain.IsUploadPdfOpen={setIsUploadPdfOpen}
        />
      </ModalOverlay>
    </div>
  );
};

export default DashboardComponent;
