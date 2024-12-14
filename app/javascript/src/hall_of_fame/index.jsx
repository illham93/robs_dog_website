import React from "react";
import ReactDOM from 'react-dom';
import './hall_of_fame.scss';
import Layout from "../layout";
import HallOfFame from "./hallOfFame";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <h2 className="mt-5 mb-3 text-center">Hall of Fame</h2>
                <HallOfFame />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})