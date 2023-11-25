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
  return (
    <div className={styles.itemsContainer}>
      {/* <h1>{title}</h1> */}
      <div className={styles.itemsInnerContainer}>
        {items?.map((item, index) => {
          return (
            <div
              key={index}
              onDoubleClick={() => doubleClickHandler(item?.docId)}
              className={styles.file}
            >
              <div className={styles.innerFile}>
                {type === "file" ? (
                  <FaRegFilePdf className={styles.pdfIcon} />
                ) : (
                  <FaRegFolder className={styles.pdfIcon} />
                )}
                <p>{item?.data?.name}</p>
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
