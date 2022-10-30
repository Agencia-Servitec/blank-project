import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styled, { css } from "styled-components";
import { mediaQuery } from "../../../styles/constants/mediaQuery";

export const ButtonsFloating = () => (
  <Container>
    <a
      href={`https://api.whatsapp.com/send?phone=929054672`}
      target="_blank"
      rel="noreferrer"
    >
      <WrapperButton bg="#5cc753">
        <div className="item-text">
          <div>Servicio Whatsapp</div>
          <div>929054672</div>
        </div>
        <div className="item-icon">
          <FontAwesomeIcon icon={faWhatsapp} className="icon" />
        </div>
      </WrapperButton>
    </a>
  </Container>
);

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0.8%;
  z-index: 998;
`;

const WrapperButton = styled.div`
  ${({ bg }) => css`
    background: ${bg};
    padding: 0.3rem 0.7rem;
    border: none;
    margin-bottom: 0.7rem;
    height: auto;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 7rem;
    border-bottom-right-radius: 7rem;
    ${mediaQuery.minTablet} {
      padding: 0.3rem 0.9rem;
    }
    .item-icon {
      margin-left: 0.5rem;
      padding: 0.3rem;
      svg {
        color: #fff;
        font-size: 2.5rem;
        ${mediaQuery.minTablet} {
          font-size: 3rem;
        }
      }
    }
    .item-text {
      font-size: 0.8rem;
      color: #fff;
      div {
        line-height: 1.5rem;
      }
      div:last-child {
        font-size: 1.3rem;
      }

      ${mediaQuery.minTablet} {
        font-size: 0.9rem;
        div {
          line-height: 1.7rem;
        }
        div:last-child {
          font-size: 1.6rem;
        }
      }
    }
  `}
`;
