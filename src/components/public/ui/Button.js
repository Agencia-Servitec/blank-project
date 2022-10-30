import React from "react";
import styled, { css } from "styled-components";

export const Button = ({ children, block = "false", onClick }) => {
  return (
    <Container block={block} onClick={onClick}>
      {children}
    </Container>
  );
};

const Container = styled.button`
  ${({ block }) => css`
    width: ${block ? "100%" : "auto"};
    height: auto;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background: #0b580b;
    color: #fff;
    font-size: 1.3rem;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
    &:hover {
      background: #073c07;
    }
  `}
`;
