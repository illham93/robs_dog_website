import React from "react";
import Layout from "../layout";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class Events extends React.Component {

    state = {
        events: [
            {
                title: 'test event',
                start: new Date(2024, 9, 26, 10, 0),
                end: new Date(2024, 9, 26, 12, 0),
            },
        ],
        loading: true,
        error: '',
    }

    render () {
        const {loading, error, events} = this.state;

        return (
            <Layout>
                <div className="container text-center">
                    <h2 className="mt-5 mb-3">Events</h2>

                    {loading && <h3>Loading...</h3>}

                    {error ? (
                        <h3 className="text-danger mt-2">Error: {error}</h3>
                    ) : (
                      <>
                        <div id="events-calendar">
                            <Calendar localizer={localizer} events={events} startAccessor='start' endAccessor='end' style={{ height: '600px' }}/>
                        </div>
                      </>  
                    )}
                </div>

            </Layout>
        )
    }
}

export default Events