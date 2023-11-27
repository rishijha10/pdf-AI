import React, { useContext, useEffect } from "react";
// import DashboardItems from "../components/dashboard-components/DashboardComponent";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../store/MainContext";
import DashboardComponent from "../components/dashboard-components/DashboardComponent";

const DashboardPage = () => {
  const navigate = useNavigate();
  const ctxMain = useContext(MainContext);
  useEffect(() => {
    if (!ctxMain.user) {
      navigate("/auth?mode=signIn");
    }
  }, []);
  return <DashboardComponent />;
};

export default DashboardPage;
