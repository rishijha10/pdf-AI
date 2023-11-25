import React from "react";
import styles from "./ModalOverlay.module.css";
const ModalOverlay = (props) => {
  return (
    <>
      {props.isCreateFolderOpen && (
        <div className={styles.overlay}>{props.children}</div>
      )}
    </>
  );
};

export default ModalOverlay;
