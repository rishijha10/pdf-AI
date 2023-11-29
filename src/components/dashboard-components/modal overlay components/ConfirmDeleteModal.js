import React, { useContext } from "react";
import styles from "./ConfirmDeleteModal.module.css";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../../../store/MainContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
const ConfirmDeleteModal = () => {
  const ctxMain = useContext(MainContext);
  async function folderDeleteHandler(documentData) {
    console.log(documentData);
    if (ctxMain?.userFiles) {
      for (let i = 0; i < ctxMain?.userFiles.length; i++) {
        await deleteDoc(
          doc(db, "Pdf-Files", `${ctxMain?.userFiles[i]?.docId}`)
        );
      }
      ctxMain.setUserFiles([]);
    }
    await deleteDoc(doc(db, "Folders", `${documentData?.docId}`));
    const updatedUserFolders = ctxMain.userFolders.filter(
      (item) => item.docId !== documentData?.docId
    );
    ctxMain.setUserFolders(updatedUserFolders);
    ctxMain.setConfirmDeleteModalOpen(false);
  }
  function closeModalHandler() {
    ctxMain.setConfirmDeleteModalOpen(false);
    ctxMain.setCurrentDocument({});
    ctxMain.setCurrentPath("root");
  }
  return (
    <>
      {ctxMain.confirmDeleteModalOpen && (
        <div className={styles.modalContainer}>
          <h3>Are you sure you want to delete this folder?</h3>
          <p>
            This folder will be permanently deleted, you cannot undo this action
          </p>
          <div className={styles.buttonConatiner}>
            <button onClick={closeModalHandler}>Cancel</button>
            <button
              onClick={() => folderDeleteHandler(ctxMain?.currentDocument)}
            >
              Delete
            </button>
          </div>
          <IoClose className={styles.closeIcon} onClick={closeModalHandler} />
        </div>
      )}
    </>
  );
};

export default ConfirmDeleteModal;
