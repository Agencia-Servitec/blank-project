import {Link} from "react-router-dom";
import React from "react";
import "../index.css";

export const Layout = (props) => {
    return <div>
        <div className="header">
            <ul>
                <li style={{marginRight: "1rem"}}>
                    <Link to="/"> Home </Link>
                </li>
                <li style={{marginRight: "1rem"}}>
                    <Link to="/users"> Users </Link>
                </li>
                <li style={{marginRight: "1rem"}}>
                    <Link to="/nosotros"> Nosotros </Link>
                </li>
            </ul>
        </div>
        <div className="body">
            {props.children}
        </div>
        <div className="footer">
            <p>Todos los derechos</p>
        </div>
    </div>
}