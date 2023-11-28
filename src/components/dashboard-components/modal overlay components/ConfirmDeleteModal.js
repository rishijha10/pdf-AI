import React, { useContext } from "react";
import styles from "./ConfirmDeleteModal.module.css";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../../../store/MainContext";
const ConfirmDeleteModal = () => {
  const ctxMain = useContext(MainContext);
  return (
    <>
      {ctxMain.confirmDeleteModalOpen && (
        <div className={styles.modalContainer}>
          <h3>Are you sure you want to delete this folder?</h3>
          <p>
            This folder will be permanently deleted, you cannot undo this action
          </p>
          <div className={styles.buttonConatiner}>
            <button onClick={() => ctxMain.setConfirmDeleteModalOpen(false)}>
              Cancel
            </button>
            <button>Delete</button>
          </div>
          <IoClose
            className={styles.closeIcon}
            onClick={() => ctxMain.setConfirmDeleteModalOpen(false)}
            // onClick={() => ctxMain.setIsCreateFolderOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default ConfirmDeleteModal;
