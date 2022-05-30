import React from 'react';
import {useParams} from "react-router";
import {Avatar} from "../components/Avatar";

export const User = () => {

    const {userEmail}  = useParams();

    return <div className="layout">
        <h1>Page user profile</h1>
        <Avatar avatarName={userEmail}/>
    </div>
}