import React from "react";
import ReactDOM from 'react-dom';
import MembersHome from './membersHome';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <MembersHome />,
        document.body.appendChild(document.createElement('div')),
    )
})