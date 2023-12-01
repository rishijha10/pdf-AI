import React, { useContext } from "react";
import styles from "./DashboardItems.module.css";
import { useNavigate } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { GoClock } from "react-icons/go";
import { MainContext } from "../../store/MainContext";
import { PiFilePdfLight } from "react-icons/pi";

const DashboardItems = (props) => {
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
        {props.items?.map((item, index) => {
          const dateObject = new Date(item?.data?.createdAt);
          const year = dateObject.getFullYear();
          const month = dateObject.getMonth();
          const day = dateObject.getDate();
          const hour = dateObject.getHours();
          const minutes = dateObject.getMinutes();
          const seconds = dateObject.getSeconds();
          const title =
            item?.data?.name.length > 22
              ? item?.data?.name.substring(0, 22) + "..."
              : item?.data?.name;
          return (
            <div key={index} className={styles.file}>
              <div className={styles.innerFile}>
                {props.type === "file" ? (
                  <div className={styles.fileNameAndDateContainer}>
                    <div className={styles.fileName}>
                      <PiFilePdfLight className={styles.pdfIcon} />
                      <p
                        onClick={() => {
                          pdfHandler(item);
                          props.setDeleteType("file");
                        }}
                      >
                        {/* {item?.data?.name} */}
                        {title}
                      </p>
                    </div>
                    <div className={styles.fileDate}>
                      <GoClock className={styles.clockIcon} />
                      <p>
                        {year +
                          "-" +
                          month +
                          "-" +
                          day +
                          " " +
                          hour +
                          ":" +
                          minutes +
                          ":" +
                          seconds}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <FaRegFolder className={styles.pdfIcon} />
                    <p
                      onClick={() => {
                        doubleClickHandler(item?.docId);
                        props.setDeleteType("folder");
                      }}
                    >
                      {item?.data?.name}
                    </p>
                  </>
                )}
              </div>
              <MdDeleteOutline
                className={` ${styles.deleteIcon}`}
                // onClick={() => {
                //   ctxMain.setConfirmDeleteModalOpen(true);
                //   ctxMain.setCurrentDocument(item);
                //   ctxMain.setCurrentPath(item?.docId);
                // }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardItems;
