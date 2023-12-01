import React from "react";
import { useContext } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import { MainContext } from "../../store/MainContext";
import styles from "./UploadButton.module.css";
const UploadButton = () => {
  const ctxMain = useContext(MainContext);
  return (
    <button
      className={styles.button}
      onClick={() => ctxMain.setIsUploadPdfOpen(true)}
    >
      Upload <RiUploadCloud2Line className={styles.uploadIcon} />
    </button>
  );
};

export default UploadButton;
