import React from "react";
import ReactDOM from 'react-dom';
import AdminHome from './adminHome';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <AdminHome />,
        document.getElementById('admin-home-container')
    )
})