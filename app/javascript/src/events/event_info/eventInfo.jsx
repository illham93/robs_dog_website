import React from "react";
import { handleErrors, safeCredentials } from "../../utils/fetchHelper";

class EventInfo extends React.Component {

    state = {
        loading: true,
        loadingAuthentication: true,
        error: '',
        event: {},
        authenticated: false,
        user_id: '',
        successMessage: '',
    }

    componentDidMount() {

        fetch('/api/authenticated')
            .then(handleErrors)
            .then(data => {
                this.setState({
                    authenticated: data.authenticated,
                    user_id: data.user_id,
                    member: data.member,
                    loadingAuthentication: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error authenticating user',
                    loadingAuthentication: false,
                });
        });

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

        const successMessage = sessionStorage.getItem('successMessage');
        if (successMessage) {
            this.setState({ successMessage });
            sessionStorage.removeItem('successMessage');
        }
    }

    signUp = () => {
        const user_id = this.state.user_id;
        const event_id = this.state.event.id;

        fetch(`/api/event_signups/${user_id}/${event_id}`, safeCredentials({
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }))
        .then(handleErrors)
        .then (data => {
            if (data.success) {
                sessionStorage.setItem('successMessage', 'Signed up for event!');
                window.location.reload();
            } else {
                console.error('Error signing up for event', data);
                this.setState({error: data.error || 'Error signing up for event'});
            }
        })
        .catch(error => {
            console.error('Error: ', error.error);
            this.setState({error: error.error || 'Error signing up for event'});
        })
    }

    render () {
        const {loading, loadingAuthentication, authenticated, error, event, successMessage} = this.state;

        if (loading) {
            return <h3>Loading...</h3>;
        }

        if (error) {
            return <h3 className="text-danger mt-2">Error: {error}</h3>;
        }

        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(event.address)}`;

        return (
            <div className="container rounded-grey-background text-shadow">
                {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}
                <div className="row mb-5">
                    <div className="col-lg-6">
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

                        {loadingAuthentication && <div>Loading authentication status...</div>}

                        {authenticated ? (
                            <button className="btn btn-lg btn-primary" onClick={this.signUp}>Sign Up</button>
                        ) : (
                            <h4>You must <a href="/login">log in</a> to sign up for this event.</h4>
                        )}

                    </div>
                    <div className="col-lg-6">
                        <div className="google-maps-container">
                            <iframe
                                style={{ border: 0 }}
                                src={googleMapsUrl}
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventInfo;