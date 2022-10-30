import React from "react";
import Layout from "antd/lib/layout";

const { Footer: FooterLayout } = Layout;

export const Footer = () => {
  return (
    <FooterLayout style={{ textAlign: "center" }}>
      Cobiene web ©2022 Created by <strong>AgenciaServitec</strong>
    </FooterLayout>
  );
};
