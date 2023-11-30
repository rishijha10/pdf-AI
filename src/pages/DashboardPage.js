import React, { useContext, useEffect } from "react";
// import DashboardItems from "../components/dashboard-components/DashboardComponent";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../store/MainContext";
import DashboardComponent from "../components/dashboard-components/DashboardComponent";

const DashboardPage = () => {
  const navigate = useNavigate();
  const ctxMain = useContext(MainContext);
  ctxMain.setCurrentPath("root");
  // ctxMain.setUs
  //reset user files to empty array when on the main dashboard with folders
  // ctxMain.setUserFiles([]);
  useEffect(() => {
    if (!ctxMain.user) {
      navigate("/auth?mode=signIn");
    }
  }, []);
  return <DashboardComponent />;
};

export default DashboardPage;
