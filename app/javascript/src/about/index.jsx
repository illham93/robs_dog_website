import React from "react";
import ReactDOM from 'react-dom';
import './about.scss';
import Layout from "../layout";
import About from "./about";
import Sponsors from "./sponsors";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <About />
                <Sponsors />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})