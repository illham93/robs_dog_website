import React from "react";
import ReactDOM from 'react-dom';
import MembersHome from './membersHome';
import './members.scss';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <MembersHome />,
        document.body.appendChild(document.createElement('div')),
    )
})