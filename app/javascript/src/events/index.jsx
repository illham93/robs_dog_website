import React from "react";
import ReactDOM from 'react-dom';
import Events from './events';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Events />,
        document.body.appendChild(document.createElement('div')),
    )
})