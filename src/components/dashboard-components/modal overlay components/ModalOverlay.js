import React, { useContext } from "react";
import styles from "./ModalOverlay.module.css";
import { MainContext } from "../../../store/MainContext";
const ModalOverlay = (props) => {
  const ctxMain = useContext(MainContext);
  return (
    <>
      {(props.isCreateFolderOpen && (
        <div className={styles.overlay}>{props.children}</div>
      )) ||
        (ctxMain.isUploadPdfOpen && (
          <div className={styles.overlay}>{props.children}</div>
        ))}
    </>
  );
};

export default ModalOverlay;
