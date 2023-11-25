import React, { useEffect } from "react";
import styles from "./DashboardItems.module.css";
import { useNavigate } from "react-router-dom";
const DashboardItems = ({ title, items }) => {
  // console.log("Dashboard items ", items);
  const navigate = useNavigate();
  function doubleClickHandler(id) {
    navigate(`/folder/${id}`);
  }
  return (
    <div className={styles.itemsContainer}>
      <h1>{title}</h1>
      <div className={styles.itemsInnerContainer}>
        {items?.map((item, index) => {
          return (
            <p
              key={index}
              onDoubleClick={() => doubleClickHandler(item?.docId)}
            >
              {item?.data?.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardItems;
