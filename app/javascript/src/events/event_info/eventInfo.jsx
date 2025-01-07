import React from "react";
import { handleErrors, safeCredentials } from "../../utils/fetchHelper";

class EventInfo extends React.Component {

    state = {
        loading: true,
        loadingAuthentication: true,
        loadingSignup: true,
        error: '',
        event: {},
        authenticated: false,
        user_id: '',
        successMessage: '',
        signedUp: false,
        checkedSignupStatus: false,
        member: false,
        status: '',
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

    componentDidUpdate() {
        const {user_id, event, checkedSignupStatus} = this.state;

        if (user_id && event.id && !checkedSignupStatus) {
            this.setState({ checkedSignupStatus: true});

            fetch(`/api/event_signups/${user_id}/${event.id}`)
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    loadingSignup: false,
                    signedUp: data.signedUp,
                })
                if (data.signedUp) {
                    this.setState({
                        status: data.event_signup.status,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error retrieving signed up status',
                    loadingSignup: false,
                });
            })
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
                sessionStorage.setItem('successMessage', 'Signed up for event, clink the link below to complete registration');
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

    cancelSignUp = () => {
        if (confirm('Are you sure you want to cancel registration for this event?')) {
            const user_id = this.state.user_id;
            const event_id = this.state.event.id;
    
            fetch(`/api/event_signups/${user_id}/${event_id}`, safeCredentials({
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('successMessage', 'Canceled registration for event.');
                    window.location.reload();
                } else {
                    console.error('Error cancelling sign up:', data);
                    this.setState({error: data.error || 'Error cancelling registration'});
                }
            })
            .catch(error => {
                console.error('Error: ', error.error);
                this.setState({error: error.error || 'Error cancelling registration'});
            })
        }
    }

    render () {
        const {loading, loadingAuthentication, loadingSignup, authenticated, error, event, successMessage, signedUp, member, status} = this.state; 
        let eventIsInFuture = false;

        if (new Date(event.date) >= new Date()) {
            eventIsInFuture = true;
        };

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
                        <h4>Address: {event.address}</h4>
                        <p>Additional notes: {event.notes}</p>

                        {loadingAuthentication && <div>Loading authentication status...</div>}

                        {eventIsInFuture && (
                            <>
                                {authenticated ? (
                                    <>
                                        {event.members_only && !member? (
                                            <>
                                                <h4>You must become a member to sign up for this event.</h4>
                                                <h4>Click <a href="/members">here</a> to apply</h4>
                                            </>
                                        ) : (
                                            <>
                                                {event.members_only && <h5>*This is a members only event</h5>}
                                                
                                                {loadingSignup && <div>Loading signed up status...</div>}

                                                {signedUp ? (
                                                    <>
                                                        {status === 'registered' ? (
                                                            <h4>You are <span className="text-success">registered</span> for this event!</h4>
                                                        ) : (
                                                            <>
                                                                <h4>Registration status: <span className="text-warning">pending</span></h4>
                                                                <h5>Click <a href={event.registration_link} target="blank">here</a> to complete registration</h5>
                                                            </>
                                                        )}
                                                        <button className="mt-2 btn btn-lg btn-danger" onClick={this.cancelSignUp}>Cancel registration</button>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-lg btn-primary mb-4" onClick={this.signUp}>Sign Up</button>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <h4>You must <a href="/login">log in</a> to sign up for this event.</h4>
                                )}
                            </>
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