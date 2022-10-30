import React, { useState } from "react";
import styled from "styled-components";
import { CobieneLogoLarge } from "../../../images";
import { useDevice } from "../../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "./Drawer";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { ButtonsFloating } from "../ui/ButtonsFloating";

export const BaseLayout = ({ children }) => {
  const { isMobile } = useDevice();

  const [visibleDrawer, setVisibleDrawer] = useState(false);

  return (
    <Container>
      <Drawer
        visibleDrawer={visibleDrawer}
        onSetVisibleDrawer={setVisibleDrawer}
      />
      <div className="header">
        {isMobile ? (
          <div className="menu-mobile">
            <div className="icon-bar" onClick={() => setVisibleDrawer(true)}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
          </div>
        ) : (
          <div className="menu-list">
            <li>
              <Link to="/">
                <a>INICIO</a>
              </Link>
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
      </div>
      <div className="body">{children}</div>
      <Footer />
      <ButtonsFloating />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  position: relative;

  .header {
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
  }

  .footer {
    width: 100%;
    height: auto;
    padding: 1rem;
    background: black;
    color: #fff;
  }
`;
