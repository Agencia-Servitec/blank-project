import React from "react";
import DrawerAntd from "antd/lib/drawer";
import styled from "styled-components";

export const Drawer = ({ visibleDrawer, onSetVisibleDrawer }) => {
  return (
    <ComponentDrawerAntd
      title={null}
      placement="right"
      onClose={() => onSetVisibleDrawer(false)}
      visible={visibleDrawer}
    >
      <MenuItem onClick={() => onSetVisibleDrawer(false)}>
        <a href="#">Inicio</a>
      </MenuItem>
      <MenuItem onClick={() => onSetVisibleDrawer(false)}>
        <a href="#about-us">Nosotros</a>
      </MenuItem>
      <MenuItem onClick={() => onSetVisibleDrawer(false)}>
        <a href="#departments">Departamentos</a>
      </MenuItem>
      <MenuItem onClick={() => onSetVisibleDrawer(false)}>
        <a href="#contact">Contácto</a>
      </MenuItem>
    </ComponentDrawerAntd>
  );
};

const ComponentDrawerAntd = styled(DrawerAntd)`
  color: #fff;

  .ant-drawer-header {
    .ant-drawer-close {
      color: #fff;
    }
  }
  .ant-drawer-header,
  .ant-drawer-content {
    background: #1b1b1b;
  }
`;

const MenuItem = styled.div`
  margin-bottom: 1.5rem;
  a {
    color: #fff;
    font-size: 1.7rem;
  }
`;
