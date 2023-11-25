import React, { useState } from "react";
import styles from "./DashboardComponent.module.css";
import SubBar from "./SubBar";
import DashboardItems from "./DashboardItems";
import CreateFolderModal from "./CreateFolderModal";
import { useContext } from "react";
import { MainContext } from "../../store/MainContext";
const DashboardComponent = () => {
  const ctxMain = useContext(MainContext);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  return (
    <div className={styles.outerContainer}>
      <SubBar
        isCreateFolderOpen={isCreateFolderOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
      />
      <DashboardItems title={"Folders"} items={ctxMain.userFolders} />
      <DashboardItems
        title={"Files"}
        items={["Files 1", "Files 2", "Files 3"]}
      />
      <CreateFolderModal
        isCreateFolderOpen={isCreateFolderOpen}
        setIsCreateFolderOpen={setIsCreateFolderOpen}
      />
    </div>
  );
};

export default DashboardComponent;
