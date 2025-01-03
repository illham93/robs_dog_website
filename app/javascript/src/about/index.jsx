import React from "react";
import ReactDOM from 'react-dom';
import './about.scss';
import Layout from "../layout";
import About from "./about";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <h2 className="mt-5 mb-3 text-center">About Us</h2>
                <About />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})