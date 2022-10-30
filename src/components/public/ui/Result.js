import React from "react";
import styled from "styled-components";

export const Result = ({
  status = 500,
  title = "500",
  subTitle = "Perdón, algo salió mal.",
  extra,
}) => {
  return (
    <Container>
      <ul>
        <li>
          <h1>{title}</h1>
        </li>
        <li>
          <h3>{subTitle}</h3>
        </li>
        {extra && <li>{extra}</li>}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  ul {
    width: auto;
    li {
      display: block;
      text-align: center;
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: 1em;
      h1 {
        font-size: 5em;
        line-height: 0.2em;
      }
    }
  }
`;
