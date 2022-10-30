import React from "react";
import Layout from "antd/lib/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const { Header: HeaderLayout } = Layout;

export const Header = ({ isVisibleDrawer, setIsVisibleDrawer }) => {
  return (
    <HeaderLayout className="site-layout-background header-layout">
      <span
        onClick={() => setIsVisibleDrawer(!isVisibleDrawer)}
        className="trigger"
      >
        <FontAwesomeIcon icon={faBars} />
      </span>
    </HeaderLayout>
  );
};
