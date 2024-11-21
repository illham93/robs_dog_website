import React from "react";
import ReactDOM from 'react-dom';
import Events from './eventsCalendar';
import './events.scss';
import Layout from "../layout";
import EventsCalendar from "./eventsCalendar";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container text-center">
                <h2 className="mt-5 mb-3">Events</h2>
                <EventsCalendar includeLink={true} />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})