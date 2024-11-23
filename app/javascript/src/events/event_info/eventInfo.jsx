import React from "react";
import { handleErrors } from "../../utils/fetchHelper";

class EventInfo extends React.Component {

    state = {
        loading: true,
        error: '',
        event: {},
    }

    componentDidMount() {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);

        fetch(`/api/event/${id}`)
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    loading: false,
                    event: data.event,
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message || 'Error retrieving event'
                });
            });
    }

    render () {
        const {loading, error, event} = this.state;

        if (loading) {
            return <h3>Loading...</h3>;
        }

        if (error) {
            return <h3 className="text-danger mt-2">Error: {error}</h3>;
        }

        const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
        const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(event.address)}`;

        return (
            <div className="container">
                <h4>Event Title: {event.title}</h4>
                <h4>Description:</h4>
                <h5>{event.description}</h5>
                <h4>Date: {event.date}</h4>
                <h4>Start Time: {event.start_time}</h4>
                {event.end_time && (
                    <h4>End Time: {event.end_time}</h4>
                )}
                {event.multi_day && (
                    <h5>
                        *This is part of a multi-day event
                    </h5>
                )}
                <p>Address: {event.address}</p>
                <iframe
                    width='600'
                    height='450'
                    frameBorder='0'
                    style={{ border: 0 }}
                    src={googleMapsUrl}
                    allowFullScreen
                />
            </div>
        );
    }
}

export default EventInfo;