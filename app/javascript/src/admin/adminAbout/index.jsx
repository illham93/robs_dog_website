import React from "react";
import ReactDOM from 'react-dom';
import './admin_about.scss';
import Layout from "../../layout";
import AddSponsor from "./addSponsor";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <h2 className="mt-5 mb-3 text-center">Admin About</h2>
                <AddSponsor />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})