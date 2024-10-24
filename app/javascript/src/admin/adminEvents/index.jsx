import React from "react";
import ReactDOM from 'react-dom';
import AdminEvents from './adminEvents';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <AdminEvents />,
        document.getElementById('admin-events-container')
    )
})