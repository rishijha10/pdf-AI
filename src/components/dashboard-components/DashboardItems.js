import React, { useEffect } from "react";
import styles from "./DashboardItems.module.css";
import { useNavigate } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFolder } from "react-icons/fa6";
const DashboardItems = ({ title, items, type }) => {
  // console.log("Dashboard items ", items);
  const navigate = useNavigate();
  function doubleClickHandler(id) {
    navigate(`/folder/${id}`);
  }
  function pdfHandler(pdfUrl) {
    // console.log("Items: ", pdfUrl.data?.fileUrl);
    // console.log("Items type :", typeof pdfUrl.data?.fileUrl);
    // const modifiedUrl = pdfUrl.data?.fileUrl.replace("https://", "");
    // console.log(modifiedUrl);
    navigate(`/pdf-ai-gen1/${pdfUrl?.data?.name}`);
    // navigate(`/pdf-ai-gen1/${pdfUrl.data?.fileUrl}`);
  }
  return (
    <div className={styles.itemsContainer}>
      {/* <h1>{title}</h1> */}
      <div className={styles.itemsInnerContainer}>
        {items?.map((item, index) => {
          return (
            <div
              key={index}
              // onDoubleClick={() => doubleClickHandler(item?.docId)}
              className={styles.file}
            >
              <div className={styles.innerFile}>
                {type === "file" ? (
                  <>
                    <FaRegFilePdf className={styles.pdfIcon} />
                    <p onClick={() => pdfHandler(item)}>{item?.data?.name}</p>
                  </>
                ) : (
                  <>
                    <FaRegFolder className={styles.pdfIcon} />
                    <p onDoubleClick={() => doubleClickHandler(item?.docId)}>
                      {item?.data?.name}
                    </p>
                  </>
                )}
              </div>
              {/* <p>{item?data?.}</p> */}
              <MdDeleteOutline className={styles.pdfIcon} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardItems;
