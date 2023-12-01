import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "./components/general-components/MainNavigation";

const LayoutComponent = () => {
  return (
    <Fragment>
      {/* <MainNavigation /> */}
      <Outlet />
    </Fragment>
  );
};

export default LayoutComponent;
