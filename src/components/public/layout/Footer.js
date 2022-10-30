import React from "react";
import styled from "styled-components";
import { CobieneLogoLarge } from "../../../images";
import { faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Container>
      <div className="item-logo-footer">
        <div className="item-logo">
          <Link to="/">
            <img src={CobieneLogoLarge} alt="Cobiene logo" />
          </Link>
        </div>
        <div className="item-text">
          <h1>COBIENE</h1>
          <div>
            <span>COMANDO DE BIENESTAR DEL EJÉRCITO</span>
          </div>
        </div>
      </div>
      <div className="list-menu">
        <ul>
          <li>
            <span>TÉRMINOS Y CONDICIONES</span>
          </li>
          <li>
            <span>POLÍTICA Y PRIVACIDAD</span>
          </li>
          <li>
            <span>CONTACTO</span>
          </li>
        </ul>
      </div>
      <div className="items-socials">
        <ul>
          <li>
            <a
              href={`https://api.whatsapp.com/send?phone=929054672`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/BienestarEP"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
        </ul>
      </div>
      <div className="bottom-footer">
        <div>
          © Copyright 2022 - COBIENE - Diseñado por{" "}
          <a href="https://servitecperu.com/" target="_blank" rel="noreferrer">
            Agencia Servitec
          </a>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 15.86%, #090808 100%);
  padding: 4rem 0 0 0;
  .item-logo-footer {
    margin: auto;
    .item-logo {
      display: flex;
      justify-content: center;
      img {
        width: 7rem;
        height: auto;
        margin: 0.5rem 0 1.5rem 0;
      }
    }
    .item-text {
      text-align: center;
      h1 {
        font-size: 3.8rem;
        font-weight: 600;
        margin: 1rem;
      }
      div span {
        font-size: 0.8rem;
      }
    }
  }

  .list-menu {
    width: 100%;
    margin: 3rem auto;
    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      &:after {
        content: "";
        width: 50%;
        max-width: 30rem;
        height: 1px;
        background: #fff;
        bottom: 0;
        text-align: center;
        position: absolute;
        margin-top: 2rem;
      }
      li {
        margin-bottom: 1.7rem;
        span {
          border-right: 1px solid #fff;
          padding: 0 1rem;
          font-size: 0.8rem;
        }
        &:last-child {
          span {
            border-right: none;
          }
        }
      }
    }
  }
  .items-socials {
    width: 100%;
    margin: 3rem auto;
    ul {
      list-style: none;
      display: flex;
      justify-content: center;
      position: relative;
      li {
        color: #fff;
        padding: 0 1rem;
        font-size: 2.5rem;
        cursor: pointer;
        a {
          color: #fff;
        }
      }
    }
  }
  .bottom-footer {
    width: 100%;
    padding: 1.5rem;
    div {
      width: 100%;
      text-align: center;
      font-size: 0.8rem;
      a {
        font-weight: 500;
        color: #fad249;
      }
    }
  }
`;
