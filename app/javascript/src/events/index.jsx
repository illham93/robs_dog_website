import React from "react";
import ReactDOM from 'react-dom';
import Events from './events';
import './events.scss';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Events />,
        document.body.appendChild(document.createElement('div')),
    )
})