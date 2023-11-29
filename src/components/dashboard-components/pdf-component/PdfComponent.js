import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SubBar from "../SubBar";
import { useContext } from "react";
import { MainContext } from "../../../store/MainContext";
import DashboardItems from "../DashboardItems";
import ModalOverlay from "../modal overlay components/ModalOverlay";
import UploadPdfModal from "../modal overlay components/UploadPdfModal";
import ConfirmDeleteModal from "../modal overlay components/ConfirmDeleteModal";
const PdfComponent = () => {
  const { folderId } = useParams();
  const ctxMain = useContext(MainContext);
  useEffect(() => {
    ctxMain.setCurrentPath(folderId);
  }, [ctxMain, folderId]);
  return (
    <div style={{ marginTop: "100px", display: "inline-block", width: "100%" }}>
      <SubBar showCreateFolderBtn={false} />
      <DashboardItems title={"Files"} items={ctxMain.userFiles} type={"file"} />
      {ctxMain.isUploadPdfOpen && (
        <ModalOverlay>
          <UploadPdfModal />
        </ModalOverlay>
      )}
      {ctxMain.confirmDeleteModalOpen && (
        <ModalOverlay>
          <ConfirmDeleteModal />
        </ModalOverlay>
      )}
    </div>
  );
};

export default PdfComponent;
