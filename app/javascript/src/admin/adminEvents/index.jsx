import React from "react";
import ReactDOM from 'react-dom';
import AdminEvents from './adminEvents';
import Layout from "../../layout";
import './adminEvents.scss';


document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <AdminEvents />
        </Layout>,
        document.getElementById('admin-events-container')
    )
})

