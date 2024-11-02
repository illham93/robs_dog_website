import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { handleErrors } from "../utils/fetchHelper";

const localizer = momentLocalizer(moment);

const EventTooltip = ({event}) => (
    <div className="calendar-tooltip" data-tip data-for={`event-${event.id}`}>
        {event.title}
        <ReactTooltip className="calendar-tooltip" id={`event-${event.id}`} place="top" effect="solid">
            <div className="tooltip-content">
                <p><strong>{event.title}</strong></p>
                <p>{event.description}</p>
                <p>Start time: {moment(event.start).format('h:mm a')}</p>
                <p>End time: {moment(event.end).format('h:mm a')}</p>
                <p>Location: {event.location}</p>
                {event.multi_day && <p>*This is a multi-day event</p>}
            </div>
        </ReactTooltip>
    </div>
);

class EventsCalendar extends React.Component {

    state = {
        events: [
            {
                id: 1,
                title: 'test event',
                start: new Date(2024, 9, 26, 10, 0),
                end: new Date(2024, 9, 26, 12, 0),
                description: 'This is a test event',
                location: 'test location',
            },
        ],
        loading: true,
        error: '',
    }

    componentDidMount() {
        fetch('/api/events')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                const events = data.events.map(event => {

                    if (!event.date || !event.start_time) {
                        console.warn('Skipping event due to missing date or start time:', event);
                        return null;
                    }
                    console.log("Event Data:", event.date, event.start_time, event.end_time);
                    const [year, month, day] = event.date.split('-').map(Number);
                    const [startHour, startMinute] = event.start_time.split(':').map(Number);
                    const [endHour, endMinute] = event.end_time ? event.end_time.split(':').map(Number) : [startHour, startMinute];

                    return {
                        id: event.id,
                        title: event.title,
                        description: event.description,
                        location: event.location,
                        start: new Date(year, month - 1, day, startHour, startMinute),
                        end: new Date(year, month - 1, day, endHour, endMinute),
                        multi_day: event.multi_day
                    };
                }).filter(event => event !== null); // remove null entries
                console.log(events);
                this.setState({
                    loading: false,
                    events: events,
                }, () => {
                    ReactTooltip.rebuild();
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message || 'Error rendering events'
                });
            });
    }

    render () {
        const {loading, error, events} = this.state;

        return (
            <div className="container text-center">
                
                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <>
                    <div id="calendar-container" className="bg-dark p-3 mb-5 rounded">
                        <Calendar 
                            className="rounded" 
                            localizer={localizer} 
                            events={events} 
                            startAccessor='start' 
                            endAccessor='end'
                            views={{month: true}}
                            defaultView="month"
                            components={{
                                event: EventTooltip
                            }}
                        />
                    </div>
                    </>  
                )}
            </div>
        )
    }
}

export default EventsCalendar