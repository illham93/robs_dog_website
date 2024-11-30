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
            address: '',
            multi_day: false,
        },
        usersSignedUp: [],
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

    deleteEvent = () => {
        if (confirm('Are you sure you want to delete this event?')) {
            const id = this.state.selectedEvent.id;

            fetch(`/api/events/${id}`, safeCredentials({
                method: 'DELETE',
            }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('successMessage', 'Event deleted successfully');
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error: ', error)
                this.setState({ error: error.message || 'Error deleting event' });
            });
        }
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
                address: event.address,
                multi_day: event.multi_day || false,
            }
        });

        fetch(`/api/event_signups_by_event/${event.id}`)
        .then(handleErrors)
        .then(data => {
            console.log(data);
            this.setState({
                usersSignedUp: data,
            });
        })
        .catch(error => {
            console.error('Error: ', error)
            this.setState({error: error.message || 'Error fetching signed up users'});
        })
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
        const {admin, loading, error, successMessage, selectedEvent, formValues, usersSignedUp} = this.state;

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
                                <EventsCalendar onEventClick={this.handleEventClick} includeLink={false} />

                                <h3>Edit event:</h3>
                                { selectedEvent ? (
                                    <>
                                        <div className="row">
                                            <div className="col-lg-6">
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

                                                    <label htmlFor="location" className="form-label">Location (This is just a short form that will be shown in the tooltip)</label>
                                                    <input type="text" className="form-control mb-2" name="location" value={formValues.location} onChange={this.handleInputChange} required />

                                                    <label htmlFor="address" className="form-label">Address (This is the full address that will be used on the event info page)</label>
                                                    <input type="text" className="form-control mb-2" name="address" value={formValues.address} onChange={this.handleInputChange} required />

                                                    <label htmlFor="multi_day" className="form-label">Multi-day?</label>
                                                    <input type="checkbox" className="mb-2 ms-2" name="multi_day" checked={formValues.multi_day} onChange={this.handleInputChange} />

                                                    <br/>
                                                    <button className="btn btn-success" onClick={this.editEvent}>
                                                        Save <i className="fa-solid fa-floppy-disk"></i>
                                                    </button>
                                                    <button className="btn btn-danger ms-2" onClick={this.deleteEvent} >
                                                        Delete <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </div>      
                                            </div>
                                            <div className="col-lg-6">
                                                <h4>Users signed up for this event:</h4>
                                                    {usersSignedUp.length > 0 ? (
                                                        <ul>
                                                            {usersSignedUp.map(user => (
                                                                <li key={user.id}>
                                                                    <h4>{user.user.email}</h4>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <h5>No users have signed up for this event yet.</h5>
                                                    )}
                                            </div>
                                        </div>

                                    </>
                                ) : (
                                    <p>Click on the event you wish to edit or delete</p>
                                )}

                                <h3>Add new event:</h3>
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

                                    <label htmlFor="location" className="form-label">Location (This is just a short form that will be shown in the tooltip)</label>
                                    <input type="text" className="form-control mb-2" name="location" required />

                                    <label htmlFor="address" className="form-label">Address (This is the full address that will be used on the event info page)</label>
                                    <input type="text" className="form-control mb-2" name="address" required />

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