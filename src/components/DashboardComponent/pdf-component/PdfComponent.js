import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SubBar from "../SubBar";
import { useContext } from "react";
import { MainContext } from "../../../store/MainContext";
import DashboardItems from "../DashboardItems";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
const PdfComponent = () => {
  const { folderId } = useParams();
  const ctxMain = useContext(MainContext);
  useEffect(() => {
    ctxMain.setCurrentFolder(folderId);
  }, []);

  // async function getPdfFiles(uid){
  //   try{
  //     const docRef = collection(db, 'Pdf-Files');
  //     const q = query(docRef, where('uid', '==', uid))
  //   }
  // }
  return (
    <div style={{ marginTop: "100px", display: "inline-block", width: "100%" }}>
      <SubBar showCreateFolderBtn={false} />
      {/* Folder Id: {folderId} */}
      <DashboardItems title={"Files"} items={ctxMain.userFiles} type={"file"} />
    </div>
  );
};

export default PdfComponent;
