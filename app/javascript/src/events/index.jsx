import React from "react";
import ReactDOM from 'react-dom';
import Events from './eventsCalendar';
import './events.scss';
import Layout from "../layout";
import EventsCalendar from "./eventsCalendar";
import SignedUpEvents from "./signedUpEvents";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <h2 className="mt-5 mb-3 text-center">Events Calendar</h2>
                <EventsCalendar includeLink={true} />
                <SignedUpEvents />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})