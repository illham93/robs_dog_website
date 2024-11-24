import React from "react";
import ReactDOM from 'react-dom';
import './event_info.scss';
import Layout from "../../layout";
import EventInfo from './eventInfo';
import dotenv from 'dotenv';

dotenv.config();

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <h2 className="mt-5 mb-5 text-center">Event Info</h2>
                <EventInfo />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})