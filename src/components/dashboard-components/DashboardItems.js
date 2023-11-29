import React, { useContext } from "react";
import styles from "./DashboardItems.module.css";
import { useNavigate } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { MainContext } from "../../store/MainContext";
const DashboardItems = ({ title, items, type }) => {
  const ctxMain = useContext(MainContext);
  const navigate = useNavigate();
  function doubleClickHandler(id) {
    navigate(`/folder/${id}`);
  }
  function pdfHandler(pdfData) {
    navigate(`/pdf-ai-gen1/${pdfData?.data?.name}`);
  }
  async function folderDeleteHandler(pdfData) {
    console.log(pdfData);
    await deleteDoc(doc(db, "Folders", `${pdfData?.docId}`));
    const updatedUserFolders = ctxMain.userFolders.filter(
      (item) => item.docId !== pdfData?.docId
    );
    ctxMain.setUserFolders(updatedUserFolders);
  }
  return (
    <div className={styles.itemsContainer}>
      <div className={styles.itemsInnerContainer}>
        {items?.map((item, index) => {
          return (
            <div key={index} className={styles.file}>
              <div className={styles.innerFile}>
                {type === "file" ? (
                  <>
                    <FaRegFilePdf className={styles.pdfIcon} />
                    <p onClick={() => pdfHandler(item)}>{item?.data?.name}</p>
                  </>
                ) : (
                  <>
                    <FaRegFolder className={styles.pdfIcon} />
                    <p onClick={() => doubleClickHandler(item?.docId)}>
                      {item?.data?.name}
                    </p>
                  </>
                )}
              </div>
              <MdDeleteOutline
                className={styles.pdfIcon}
                onClick={() => {
                  ctxMain.setConfirmDeleteModalOpen(true);
                  ctxMain.setCurrentDocument(item);
                  ctxMain.setCurrentPath(item?.docId);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardItems;
