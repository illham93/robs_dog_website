import React from "react";
import ReactDOM from 'react-dom';
import Layout from "../layout";
import Login from './login';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <Login />
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})