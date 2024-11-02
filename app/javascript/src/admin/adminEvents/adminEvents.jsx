import React from "react";
import EventsCalendar from "../../events/eventsCalendar";
import '../../events/events.scss';
import { safeCredentialsFormData, handleErrors, safeCredentials } from "../../utils/fetchHelper";
import moment from "moment";

class AdminEvents extends React.Component {

    state = {
        admin: false,
        events: [],
        loading: true,
        error: '',
        successMessage: '',
        selectedEvent: null,
        formValues: {
            title: '',
            description: '',
            date: '',
            start_time: '',
            end_time: '',
            location: '',
            multi_day: false,
        }
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

    editEvent = () => {
        const id = this.state.selectedEvent.id;
        const formValues = this.state.formValues;

        fetch(`/api/events/${id}`, safeCredentials({
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formValues),
        }))
        .then(handleErrors)
        .then(data => {
            sessionStorage.setItem('successMessage', 'Event updated successfully');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error: ', error)
            this.setState({ error: error.message || 'Error updating event' });
        });
    }

    handleEventClick = (event) => {
        this.setState({ 
            selectedEvent: event, 
            formValues: {
                title: event.title,
                description: event.description,
                date: moment(event.start).format('YYYY-MM-DD'),
                start_time: moment(event.start).format('HH:mm'),
                end_time: event.end.getTime() !== event.start.getTime() ? moment(event.end).format('HH:mm') : '',
                location: event.location,
                multi_day: event.multi_day || false,
            }
        });
    }

    handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        this.setState(prevState => ({
            formValues: {
                ...prevState.formValues,
                [name]: type === 'checkbox' ? checked : value
            }
        }))
    }

    render() {
        const {admin, loading, error, successMessage, selectedEvent, formValues} = this.state;

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
                                <EventsCalendar onEventClick={this.handleEventClick}/>

                                <h3>Edit event:</h3>
                                { selectedEvent ? (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control mb-2" name="title" value={formValues.title} onChange={this.handleInputChange} required />

                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea type="text" className="form-control mb-2" name="description" value={formValues.description} onChange={this.handleInputChange} required />

                                            <label htmlFor="date" className="form-label">Date</label>
                                            <input type="date" className="form-control mb-2 date-time-input" name="date" value={formValues.date} onChange={this.handleInputChange} required />

                                            <label htmlFor="start_time" className="form-label">Start Time</label>
                                            <input type="time" className="form-control mb-2 date-time-input" name="start_time" value={formValues.start_time} onChange={this.handleInputChange} required />

                                            <label htmlFor="end_time" className="form-label">End Time</label>
                                            <input type="time" className="form-control mb-2 date-time-input" name="end_time" value={formValues.end_time} onChange={this.handleInputChange}
                                            />

                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input type="text" className="form-control mb-2" name="location" value={formValues.location} onChange={this.handleInputChange} required />

                                            <label htmlFor="multi_day" className="form-label">Multi-day?</label>
                                            <input type="checkbox" className="mb-2 ms-2" name="multi_day" checked={formValues.multi_day} onChange={this.handleInputChange} />

                                            <br/>
                                            <button className="btn btn-success" onClick={this.editEvent}>
                                                Save <i className="fa-solid fa-floppy-disk"></i>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p>Click on the event you wish to edit or delete</p>
                                )}

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