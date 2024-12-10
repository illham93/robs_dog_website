import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import CustomTooltip from "../../components/CustomTooltip";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { handleErrors } from "../utils/fetchHelper";

const localizer = momentLocalizer(moment);

const EventTooltip = ({ event, includeLink }) => {
    // Include the link to the event_info page if we are on the /events page, but not if we are on the /admin/events page

    const content = (
        <CustomTooltip event={event} includeLink={includeLink}>
            <div className="calendar-event" title="">
                {event.title}
            </div>
        </CustomTooltip>
    );

    return includeLink ? (
        <a className="text-white" href={`/events/${event.id}`}>
            {content}
        </a>
    ) : (
        content
    );
};

class EventsCalendar extends React.Component {

    state = {
        events: [],
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
                    const [year, month, day] = event.date.split('-').map(Number);
                    const [startHour, startMinute] = event.start_time.split(':').map(Number);
                    const [endHour, endMinute] = event.end_time ? event.end_time.split(':').map(Number) : [startHour, startMinute];

                    return {
                        id: event.id,
                        title: event.title,
                        description: event.description,
                        location: event.location,
                        address: event.address,
                        start: new Date(year, month - 1, day, startHour, startMinute),
                        end: new Date(year, month - 1, day, endHour, endMinute),
                        multi_day: event.multi_day,
                        notes: event.notes,
                        members_only: event.members_only,
                    };
                }).filter(event => event !== null); // remove null entries
                console.log(events);
                this.setState({
                    loading: false,
                    events: events,
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
        const {onEventClick, includeLink} = this.props;

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
                                event: (props) => <EventTooltip {...props} includeLink={includeLink} />
                            }}
                            onSelectEvent={onEventClick}
                        />
                    </div>
                    </>  
                )}
            </div>
        )
    }
}

export default EventsCalendar