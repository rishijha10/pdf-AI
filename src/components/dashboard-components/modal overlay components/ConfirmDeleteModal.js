import React, { useContext } from "react";
import styles from "./ConfirmDeleteModal.module.css";
import { IoClose } from "react-icons/io5";
import { MainContext } from "../../../store/MainContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";
// import { useNavigate } from "react-router-dom";
const ConfirmDeleteModal = (props) => {
  const ctxMain = useContext(MainContext);
  // const navigate = useNavigate();
  const storage = getStorage();
  async function folderDeleteHandler(documentData) {
    console.log(documentData);
    if (ctxMain?.userFiles) {
      for (let i = 0; i < ctxMain?.userFiles.length; i++) {
        await deleteDoc(
          doc(db, "Pdf-Files", `${ctxMain?.userFiles[i]?.docId}`)
        );
        console.log("Doc id of user files: ", ctxMain?.userFiles[i]?.docId);

        //update allUserFiles state by removing current file
        const updatedAllUserFiles = ctxMain.allUserFiles.filter(
          (item) => item.docId !== ctxMain?.userFiles[i]?.docId
        );
        ctxMain.setAllUserFiles(updatedAllUserFiles);

        // create reference to the file in storage that is to be deleted
        const fileRef = ref(
          storage,
          `pdfs/${String(ctxMain.user.uid)}/${
            ctxMain?.userFiles[i]?.data?.name
          }`
        );
        try {
          await deleteObject(fileRef);
          // Pdf file from storage deleted successfully
          // Remove file name from allFileNames array
          const updatedAllFileNames = ctxMain.allFileNames.filter(
            (name) => name !== ctxMain?.userFiles[i]?.data?.name
          );
          ctxMain.setAllFileNames(updatedAllFileNames);
        } catch (err) {
          console.error("Could not delete document in firebase storage", err);
        }
      }
      ctxMain.setUserFiles([]);
    }
    await deleteDoc(doc(db, "Folders", `${documentData?.docId}`));
    const updatedUserFolders = ctxMain.userFolders.filter(
      (item) => item.docId !== documentData?.docId
    );
    ctxMain.setUserFolders(updatedUserFolders);
    ctxMain.setCurrentPath("root");
    ctxMain.setCurrentDocument({});
    closeModalHandler();
  }
  function closeModalHandler() {
    ctxMain.setConfirmDeleteModalOpen(false);
  }
  async function fileDeleteHandler(documentData) {
    delete (await deleteDoc(doc(db, "Pdf-Files", `${documentData.docId}`)));

    // console.log(documentData);
    // try {
    //   await deleteDoc(doc(db, "Pdf-Files", `${documentData?.docId}`));
    //   const fileRef = ref(
    //     storage,
    //     `pdfs/${documentData?.data?.uid}/${documentData?.data?.name}`
    //   );
    //   deleteObject(fileRef)
    //     .then(() => {
    //       const updatedUserFiles = ctxMain.userFiles.filter(
    //         (item) => item.docId !== documentData.docId
    //       );
    //       ctxMain.setUserFiles(updatedUserFiles);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    //   const updatedFileNames = ctxMain.allFileNames.filter(
    //     (item) => item !== documentData.data.name
    //   );
    //   ctxMain.setAllFileNames(updatedFileNames);
    //   closeModalHandler();
    // } catch (error) {
    //   console.error(error);
    // }
    // try {
    //   const desertRef = ref(
    //     storage,
    //     `pdfs/${ctxMain.user.uid}/${documentData?.data?.name}`
    //   );
    //   await deleteDoc(doc(db, "Pdf-Files", `${documentData?.docId}`));
    //   const updatedUserFiles = ctxMain.userFiles.filter(
    //     (item) => item.docId !== documentData.docId
    //   );
    //   ctxMain.setUserFiles(updatedUserFiles);
    //   deleteObject(desertRef).then(() => {
    //     // File deleted successfully
    //     // Remove file name from allFileNames array
    //     const updatedAllFileNames = ctxMain.allFileNames.filter(
    //       (item) => item !== documentData?.data?.name
    //     );
    //     ctxMain.setAllFileNames(updatedAllFileNames);
    //   });
    //   closeModalHandler();
    //   // navigate(".");
    // } catch (error) {
    //   console.log(error);
    // }
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
              onClick={
                ctxMain?.deleteType === "file"
                  ? () => fileDeleteHandler(ctxMain?.currentDocument)
                  : () => folderDeleteHandler(ctxMain?.currentDocument)
              }
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
