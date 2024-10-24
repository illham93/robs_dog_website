import React from "react";
import ReactDOM from 'react-dom';
import Events from './events';
import './events.scss';
import Layout from "../layout";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <Events />
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})