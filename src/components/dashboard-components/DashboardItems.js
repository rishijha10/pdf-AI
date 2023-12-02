import React, { useContext } from "react";
import styles from "./DashboardItems.module.css";
import { useNavigate } from "react-router-dom";
// import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { GoClock } from "react-icons/go";
import { MainContext } from "../../store/MainContext";
import { PiFilePdfLight } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";

const DashboardItems = (props) => {
  const ctxMain = useContext(MainContext);
  const navigate = useNavigate();
  function doubleClickHandler(id) {
    // navigate(`/folder/${id}`);
    ctxMain.setCurrentPath(id);
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
          const dateObject =
            props.type === "file"
              ? new Date(item?.data?.createdAt)
              : item?.data?.createdAt.toDate();
          const year = dateObject?.getFullYear();
          const month = dateObject?.getMonth();
          const day = dateObject?.getDate();
          const hour = dateObject?.getHours();
          const minutes = dateObject?.getMinutes();
          const seconds = dateObject?.getSeconds();
          const title =
            item?.data?.name.length > 12
              ? item?.data?.name.substring(0, 18) + "..."
              : item?.data?.name;
          return (
            <section>
              <div key={index} className={styles.file}>
                <div className={styles.innerFile}>
                  <div className={styles.fileNameAndDateContainer}>
                    <div className={styles.fileName}>
                      {props.type === "file" ? (
                        <>
                          <PiFilePdfLight className={styles.pdfIcon} />
                          <p
                            onClick={() => {
                              pdfHandler(item);
                              // props.setDeleteType("file");
                            }}
                          >
                            {title}
                          </p>
                        </>
                      ) : (
                        <>
                          <FaRegFolder className={styles.pdfIcon} />
                          <p
                            onClick={() => {
                              doubleClickHandler(item?.docId);
                              // props.setDeleteType("folder");
                            }}
                          >
                            {title}
                          </p>
                        </>
                      )}
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
                </div>
                <div className={styles.addDeleteIcons}>
                  {props.type === "folder" && (
                    <IoAddOutline
                      className={styles.addIcon}
                      onClick={() => {
                        ctxMain.setIsUploadPdfOpen(true);
                        ctxMain.setCurrentPath(item?.docId);
                      }}
                    />
                  )}
                  <MdDeleteOutline
                    className={` ${styles.deleteIcon}`}
                    // onClick={() => {
                    //   ctxMain.setConfirmDeleteModalOpen(true);
                    //   ctxMain.setCurrentDocument(item);
                    //   ctxMain.setCurrentPath(item?.docId);
                    // }}
                  />
                </div>
              </div>
              {/* ctxMain.userFiles[0]?.data?.path checks the path of the first file in the userFiles array and compares it with the docId of current folder, if its true then it means the userFiles belongs to the current folder and it should be rendered */}
              {props.type === "folder" &&
                ctxMain.userFiles.length !== 0 &&
                ctxMain.userFiles[0]?.data?.path === item?.docId &&
                (<DashboardItems items={ctxMain.userFiles} type={"file"} /> ||
                  null)}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardItems;
