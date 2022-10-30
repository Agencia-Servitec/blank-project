import React from "react";
import styled from "styled-components";

export const WrapperComponent = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.div`
  width: 100%;
  max-width: 1450px;
  height: auto;
  margin: auto;
`;
