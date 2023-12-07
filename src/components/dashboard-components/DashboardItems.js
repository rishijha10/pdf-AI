// import React, { useContext, useEffect, useState } from "react";
// import styles from "./DashboardItems.module.css";
// import { useNavigate } from "react-router-dom";
// // import { FaRegFilePdf } from "react-icons/fa6";
// import { MdDeleteOutline } from "react-icons/md";
// import { FaRegFolder } from "react-icons/fa6";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../../firebase/firebase";
// import { GoClock } from "react-icons/go";
// import { MainContext } from "../../store/MainContext";
// import { PiFilePdfLight } from "react-icons/pi";
// import { IoAddOutline } from "react-icons/io5";

// const DashboardItems = (props) => {
//   const ctxMain = useContext(MainContext);
//   // const [subFiles, setSubFiles] = useState([]); //stores files inside folders, if there are any
//   // console.log("Subfiles: ", subFiles);
//   const navigate = useNavigate();
//   function pdfHandler(pdfData) {
//     navigate(`/pdf-ai-gen1/${pdfData?.data?.name}`);
//   }
//   async function folderDeleteHandler(pdfData) {
//     console.log(pdfData);
//     await deleteDoc(doc(db, "Folders", `${pdfData?.docId}`));
//     const updatedUserFolders = ctxMain.userFolders.filter(
//       (item) => item.docId !== pdfData?.docId
//     );
//     ctxMain.setUserFolders(updatedUserFolders);
//   }
//   // async function fetchSubFiles(id) {
//   //   const docRef = collection(db, "Pdf-Files");
//   //   const q = query(
//   //     docRef,
//   //     where("uid", "==", ctxMain?.user?.uid),
//   //     where("path", "==", id)
//   //   );
//   //   const querySnapshot = await getDocs(q);
//   //   const filesData = [];
//   //   querySnapshot.forEach((doc) => {
//   //     filesData.push({ data: doc.data(), docId: doc.id });
//   //   });
//   //   setSubFiles(filesData);
//   // }
//   async function fetchSubFiles(uid) {
//     // setLoading(true); // Set loading to true before fetching
//     if (!props.type === "folder") {
//       return;
//     }
//     const docRef = collection(db, "Pdf-Files");
//     const q = query(
//       docRef,
//       where("uid", "==", ctxMain?.user?.uid),
//       where("path", "==", uid)
//     );
//     try {
//       const querySnapshot = await getDocs(q);
//       const filesData = [];
//       querySnapshot.forEach((doc) => {
//         filesData.push({ data: doc.data(), docId: doc.id });
//       });
//       return filesData;
//       // setSubFiles(filesData);
//     } catch (error) {
//       console.error("Error fetching subfiles:", error);
//     } finally {
//       // setLoading(false); // Set loading to false after fetching, regardless of success or failure
//     }
//   }
//   // useEffect(() => {
//   //   fetchSubFiles(props?.items);
//   // }, []);
//   function folderClickHandler(id) {
//     ctxMain.setCurrentPath(id);
//     ctxMain.setDeleteType("folder");
//   }
//   return (
//     <div className={styles.itemsContainer}>
//       <div className={styles.itemsInnerContainer}>
//         {props.items?.map((item) => {
//           {
//             /* const subFiles =
//             props.type === "folder" &&
//             fetchSubFiles(item?.docId).then((data) => console.log(data)); */
//           }
//           const dateObject =
//             props.type === "file"
//               ? new Date(item?.data?.createdAt)
//               : item?.data?.createdAt.toDate();
//           const year = dateObject?.getFullYear();
//           const month = dateObject?.getMonth();
//           const day = dateObject?.getDate();
//           const hour = dateObject?.getHours();
//           const minutes = dateObject?.getMinutes();
//           const seconds = dateObject?.getSeconds();
//           const title =
//             item?.data?.name.length > 12
//               ? item?.data?.name.substring(0, 18) + "..."
//               : item?.data?.name;
//           return (
//             <section key={item.docId}>
//               <div className={styles.file}>
//                 <div className={styles.innerFile}>
//                   <div className={styles.fileNameAndDateContainer}>
//                     <div className={styles.fileName}>
//                       {props.type === "file" ? (
//                         <>
//                           <PiFilePdfLight className={styles.pdfIcon} />
//                           <p
//                             onClick={() => {
//                               pdfHandler(item);
//                               ctxMain.setDeleteType("file");
//                             }}
//                           >
//                             {title}
//                           </p>
//                         </>
//                       ) : (
//                         <>
//                           <FaRegFolder className={styles.pdfIcon} />
//                           <p onClick={() => folderClickHandler(item?.docId)}>
//                             {title}
//                           </p>
//                         </>
//                       )}
//                     </div>
//                     <div className={styles.fileDate}>
//                       <GoClock className={styles.clockIcon} />
//                       <p>
//                         {year +
//                           "-" +
//                           month +
//                           "-" +
//                           day +
//                           " " +
//                           hour +
//                           ":" +
//                           minutes +
//                           ":" +
//                           seconds}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className={styles.addDeleteIcons}>
//                   {props.type === "folder" && (
//                     <IoAddOutline
//                       className={styles.addIcon}
//                       onClick={() => {
//                         ctxMain.setIsUploadPdfOpen(true);
//                         ctxMain.setCurrentPath(item?.docId);
//                       }}
//                     />
//                   )}
//                   <MdDeleteOutline
//                     className={` ${styles.deleteIcon}`}
//                     onClick={() => {
//                       ctxMain.setConfirmDeleteModalOpen(true);
//                       ctxMain.setCurrentDocument(item);
//                       ctxMain.setCurrentPath(item?.docId);
//                       ctxMain.setDeleteType(
//                         props.type === "file" ? "file" : "folder"
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//               {/* ctxMain.userFiles[0]?.data?.path checks the path of the first file in the userFiles array and compares it with the docId of current folder, if its true then it means the userFiles belongs to the current folder and it should be rendered */}
//               {props.type === "folder" &&
//                 ctxMain.userFiles.length !== 0 &&
//                 ctxMain.userFiles[0]?.data?.path === item?.docId && (
//                   <DashboardItems items={ctxMain.userFiles} type={"file"} />
//                 )}
//             </section>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default DashboardItems;

///DIVIDE

import React, { useContext, useEffect, useState } from "react";
import styles from "./DashboardItems.module.css";
import { useNavigate } from "react-router-dom";
// import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { GoClock } from "react-icons/go";
import { MainContext } from "../../store/MainContext";
import { PiFilePdfLight } from "react-icons/pi";
import { IoAddOutline } from "react-icons/io5";

const DashboardItems = ({ item, type }) => {
  const ctxMain = useContext(MainContext);
  const [subFiles, setSubFiles] = useState([]); //stores files inside folders, if there are any
  const [openFolder, setOpenFolder] = useState(false);
  const navigate = useNavigate();
  function pdfHandler(pdfData) {
    navigate(`/pdf-ai-gen1/${pdfData?.data?.name}`);
  }
  // async function folderDeleteHandler(pdfData) {
  //   console.log(pdfData);
  //   await deleteDoc(doc(db, "Folders", `${pdfData?.docId}`));
  //   const updatedUserFolders = ctxMain.userFolders.filter(
  //     (item) => item?.docId !== pdfData?.docId
  //   );
  //   ctxMain.setUserFolders(updatedUserFolders);
  // }
  // async function fetchSubFiles(id) {
  //   const docRef = collection(db, "Pdf-Files");
  //   const q = query(
  //     docRef,
  //     where("uid", "==", ctxMain?.user?.uid),
  //     where("path", "==", id)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   const filesData = [];
  //   querySnapshot.forEach((doc) => {
  //     filesData.push({ data: doc.data(), docId: doc.id });
  //   });
  //   setSubFiles(filesData);
  // }
  async function fetchSubFiles(path) {
    // setLoading(true); // Set loading to true before fetching
    if (type !== "folder") {
      return;
    }
    const docRef = collection(db, "Pdf-Files");
    const q = query(
      docRef,
      where("uid", "==", ctxMain?.user?.uid),
      where("path", "==", path)
    );
    try {
      const querySnapshot = await getDocs(q);
      const filesData = [];
      querySnapshot.forEach((doc) => {
        filesData.push({ data: doc.data(), docId: doc.id });
      });
      setSubFiles(filesData);
    } catch (error) {
      console.error("Error fetching subfiles:", error);
    } finally {
      // setLoading(false); // Set loading to false after fetching, regardless of success or failure
    }
  }
  // useEffect(() => {
  //   fetchSubFiles(item?.docId);
  // }, []);
  useEffect(() => {
    fetchSubFiles(item?.docId);
  }, [item?.docId, ctxMain.allUserFiles]);
  function folderClickHandler(id) {
    ctxMain.setCurrentPath(id);
    ctxMain.setDeleteType("folder");
    setOpenFolder((prev) => !prev);
  }
  const dateObject =
    type === "file"
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
  if (type === "empty") {
    return (
      <div className={styles.emptyFolderContainer}>
        <p>
          Your dashboard is empty. Click 'Upload' to add files or 'Create
          Folder' to organize your documents
        </p>
      </div>
    );
  }
  return (
    <div className={styles.itemsContainer}>
      <div className={styles.itemsInnerContainer}>
        <section key={item?.docId}>
          <div className={styles.file}>
            <div className={styles.innerFile}>
              <div className={styles.fileNameAndDateContainer}>
                <div className={styles.fileName}>
                  {type === "file" ? (
                    <>
                      <PiFilePdfLight className={styles.pdfIcon} />
                      <p
                        onClick={() => {
                          pdfHandler(item);
                          ctxMain.setDeleteType("file");
                        }}
                      >
                        {title}
                      </p>
                    </>
                  ) : (
                    <>
                      <FaRegFolder className={styles.pdfIcon} />
                      <p onClick={() => folderClickHandler(item?.docId)}>
                        {title}
                      </p>
                    </>
                  )}
                </div>
                <div className={styles.fileDateContainer}>
                  {type === "file" ? (
                    <>
                      <GoClock className={styles.clockIcon} />
                      <p className={styles.yearText}>
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
                    </>
                  ) : (
                    <p className={styles.fileLengthText}>
                      {subFiles.length}{" "}
                      {subFiles.length === 1 ? "file" : "files"}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.addDeleteIcons}>
              {type === "folder" && (
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
                onClick={() => {
                  ctxMain.setConfirmDeleteModalOpen(true);
                  ctxMain.setCurrentDocument(item);
                  ctxMain.setCurrentPath(item?.docId);
                  ctxMain.setDeleteType(type === "file" ? "file" : "folder");
                }}
              />
            </div>
          </div>
          {/* ctxMain.userFiles[0]?.data?.path checks the path of the first file in the userFiles array and compares it with the docId of current folder, if its true then it means the userFiles belongs to the current folder and it should be rendered */}
          {type === "folder" &&
            subFiles.length !== 0 &&
            openFolder &&
            subFiles.map((item) => (
              <DashboardItems item={item} type={"file"} />
            ))}
          {/* {type === "empty" && <p>No file or folder</p>} */}
          {/* <p>No file or folder</p> */}
        </section>
      </div>
    </div>
  );
};

export default DashboardItems;
// {ctxMain.userFolders.map((item) => (
//   <DashboardItems item={item} type={"folder"} />
// ))}
// {type === "folder" &&
//             ctxMain.userFiles.length !== 0 &&
//             ctxMain.userFiles[0]?.data?.path === item?.docId && (
//               <DashboardItems items={ctxMain.userFiles} type={"file"} />
//             )}
