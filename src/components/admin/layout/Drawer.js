import React from "react";
import { Drawer as DrawerAntd, Menu } from "antd";
import styled from "styled-components";
import Title from "antd/lib/typography/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faHome,
  faSignOut,
  faUsers,
  faUsersRectangle,
  faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import { version } from "../../../firebase";
import { useAuthentication } from "../../../providers";

export const Drawer = ({ isVisibleDrawer, setIsVisibleDrawer, navigateTo }) => {
  const { logout } = useAuthentication();

  return (
    <DrawerContainer
      title={
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Blank project
          </Title>
          <span>version: {version}</span>
        </div>
      }
      placement="left"
      closable={true}
      onClose={() => setIsVisibleDrawer(!isVisibleDrawer)}
      visible={isVisibleDrawer}
      key="left"
      className="drawer-content"
      bodyStyle={{ padding: "0" }}
    >
      <div className="logo" />
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          icon={<FontAwesomeIcon icon={faHome} />}
          onClick={() => {
            navigateTo("/admin");
            setIsVisibleDrawer(false);
          }}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<FontAwesomeIcon icon={faBookOpen} />}
          onClick={() => {
            navigateTo("/admin/flip-book-pages");
            setIsVisibleDrawer(false);
          }}
        >
          Flip book pages
        </Menu.Item>
        {/*    <Menu.Item
          key="3"
          icon={<FontAwesomeIcon icon={faUsers} />}
          onClick={() => {
            navigateTo("/admin/users");
            setIsVisibleDrawer(false);
          }}
        >
          Usuarios
        </Menu.Item>*/}
        <Menu.Item
          key="3"
          icon={<FontAwesomeIcon icon={faUsers} />}
          onClick={() => {
            navigateTo("/admin/customers");
            setIsVisibleDrawer(false);
          }}
        >
          Clientes
        </Menu.Item>
        <Menu.Item
          key="8"
          icon={<FontAwesomeIcon icon={faUsersRectangle} />}
          onClick={() => {
            navigateTo("/admin/providers");
            setIsVisibleDrawer(false);
          }}
        >
          Proveedores
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<FontAwesomeIcon icon={faUsersRectangle} />}
          onClick={() => {
            navigateTo("/admin/posts");
            setIsVisibleDrawer(false);
          }}
        >
          Posts
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FontAwesomeIcon icon={faUsersSlash} />}
          onClick={() => {
            navigateTo("/admin/visitors");
            setIsVisibleDrawer(false);
          }}
        >
          Visitantes
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<FontAwesomeIcon icon={faSignOut} />}
          onClick={async () => {
            await logout();
            setIsVisibleDrawer(false);
          }}
        >
          Cerrar sesión
        </Menu.Item>
      </Menu>
    </DrawerContainer>
  );
};

const DrawerContainer = styled(DrawerAntd)`
  .drawer-content {
  }
`;
