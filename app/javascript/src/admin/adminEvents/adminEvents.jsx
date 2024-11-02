import React from "react";
import Layout from "../../layout";
import Events from '../../events/eventsCalendar'
import EventsCalendar from "../../events/eventsCalendar";
import '../../events/events.scss'
import { safeCredentialsFormData, handleErrors } from "../../utils/fetchHelper";

class AdminEvents extends React.Component {

    state = {
        admin: false,
        events: [],
        loading: true,
        error: '',
        successMessage: '',
    }

    componentDidMount() {
        fetch('/api/authenticated')
            .then(handleErrors)
            .then(data => {
                if (data.admin) {
                    this.setState({
                        admin: true,
                    })
                }
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error authenticating user'
                });
            });

        const successMessage = sessionStorage.getItem('successMessage');
        if (successMessage) {
            this.setState({ successMessage });
            sessionStorage.removeItem('successMessage');
        }
    }

    addEvent = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const wrappedData = { event: data };
        fetch(`/api/events`, safeCredentialsFormData({
            method: 'POST',
            body: JSON.stringify(wrappedData),
            headers: { 'Content-Type': 'application/json' }
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('successMessage', 'Event added successfully');
                window.location.reload();
            } else {
                console.error('Error adding event', data);
                this.setState({error: error.error || 'Error adding event'});
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            this.setState({error: error.error || 'Error adding event'});
        })
    }

    render() {
        const {admin, loading, error, successMessage} = this.state;

        return (
            <div className="container">
                {admin ? (
                    <>
                        {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}
                        {error ? (
                            <h3 className="text-danger mt-2">Error: {error}</h3>
                        ) : (
                            <>
                                <h3 className="mt-3 text-center">Admin</h3>
                                <EventsCalendar />

                                <h3>Add event:</h3>
                                <form onSubmit={(e) => this.addEvent(e)} className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control mb-2" name="title" required />

                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control mb-2" name="description" required />

                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control mb-2 date-time-input" name="date" required />

                                    <label htmlFor="start_time" className="form-label">Start Time</label>
                                    <input type="time" className="form-control mb-2 date-time-input" name="start_time" required />

                                    <label htmlFor="end_time" className="form-label">End Time</label>
                                    <input type="time" className="form-control mb-2 date-time-input" name="end_time" />

                                    <label htmlFor="location" className="form-label">Location</label>
                                    <input type="text" className="form-control mb-2" name="location" required />

                                    <label htmlFor="multi_day" className="form-label">Multi-day?</label>
                                    <input type="checkbox" className="mb-2 ms-2" name="multi_day" />

                                    <br/>
                                    <button className="btn btn-success" type="submit">
                                        Submit <i className="fa-solid fa-check"></i>
                                    </button>
                                </form>
                            </>
                        )}
                    </>
                ) : (
                    <h3 className="text-center mt-5">You are not authorized to be here</h3>
                )}
            </div>
        )
    }
}

export default AdminEvents