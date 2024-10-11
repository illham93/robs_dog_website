import React from "react";
import ReactDOM from 'react-dom';
import AdminMembers from './adminMembers';
import './adminMembers.scss';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <AdminMembers />,
        document.getElementById('admin-members-container')
    )
})