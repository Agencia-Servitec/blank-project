import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../components/public";
import { useNavigate } from "react-router";
import { mediaQuery } from "../../styles/constants/mediaQuery";

export const Page404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Container>
      <div className="wrapper-content">
        <div className="title-item">
          <h1>404</h1>
        </div>
        <div className="bottom-items">
          <h4>Pagina no encontrada</h4>
          <Button onClick={() => navigate("/")}>Regresar a inicio</Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: #161616;

  .wrapper-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 7rem 2rem;

    .title-item {
      margin-top: 2rem;

      ${mediaQuery.minTablet} {
        margin-top: 8rem;
      }

      h1 {
        font-size: 8rem;
        margin: 0;

        ${mediaQuery.minTablet} {
          line-height: 16rem;
          font-size: 17rem;
        }
      }
    }

    .bottom-items {
      h4 {
        font-size: 1.3rem;
        text-align: center;
        margin-bottom: 2rem;

        ${mediaQuery.minTablet} {
          font-size: 2rem;
        }
      }
    }
  }
`;
