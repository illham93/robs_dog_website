import React from "react";
import ReactDOM from 'react-dom';
import './event_info.scss';
import Layout from "../../layout";
import EventInfo from './eventInfo';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container text-center">
                <h2 className="mt-5 mb-3">Event Info</h2>
                <EventInfo />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})