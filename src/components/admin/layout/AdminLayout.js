import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import { Drawer } from "./Drawer";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router";

const { Content } = Layout;

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const navigateTo = (url) => navigate(url);

  return (
    <LayoutContainer>
      <Layout className="site-layout">
        <Drawer
          isVisibleDrawer={isVisibleDrawer}
          setIsVisibleDrawer={setIsVisibleDrawer}
          navigateTo={navigateTo}
        />
        <Header
          isVisibleDrawer={isVisibleDrawer}
          setIsVisibleDrawer={setIsVisibleDrawer}
        />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer />
      </Layout>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(Layout)`
  min-width: 100vw;
  min-height: 100vh;
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .site-layout .site-layout-background {
    background: #fff;
  }
  .site-layout .header-layout {
    background: #fff;
    position: sticky;
    top: 1px;
    padding: 0;
    z-index: 1000;
  }
`;
