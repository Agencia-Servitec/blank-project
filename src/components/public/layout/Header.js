import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CobieneLogoLarge } from "../../../images";
import { useDevice } from "../../../hooks";
import styled from "styled-components";

export const Header = ({ onSetVisibleDrawer }) => {
  const { isMobile } = useDevice();

  return (
    <Container>
      {isMobile ? (
        <div className="menu-mobile">
          <div className="icon-bar" onClick={() => onSetVisibleDrawer(true)}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
        </div>
      ) : (
        <div className="menu-list">
          <li>
            <a href="#">INICIO</a>
          </li>
          <li>
            <a href="#about-us">NOSOTROS</a>
          </li>
          <li>
            <Link to="/">
              <img src={CobieneLogoLarge} alt="Cobiene logo" />
            </Link>
          </li>
          <li>
            <a href="#departments">DEPARTAMENTOS</a>
          </li>
          <li>
            <a href="#contact">CONTÁCTO</a>
          </li>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  background: transparent;
  display: flex;
  justify-content: center;
  padding: 1rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 500;

  .menu-list {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      margin: 0.7rem 1.7rem;
      font-weight: bold;
      font-size: 1.2rem;
      font-family: "MontserratRegular";
      a {
        color: #fff;
      }
      img {
        width: 5rem;
        height: auto;
      }
    }
  }

  .menu-mobile {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;

    .icon-bar {
      width: auto;
      height: 100%;
      padding: 0.7rem 0.1rem 0.7rem 1.7rem;
    }
  }
`;
