import React from "react";
import styled from "styled-components";
import { Carousel } from "../../components/public";

export const Home = () => (
  <Container>
    <Carousel />
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: auto;
`;
