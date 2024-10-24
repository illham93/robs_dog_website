import React from "react";
import Layout from "../../layout";
import Events from '../../events/events'
import '../../events/events.scss'

class AdminEvents extends React.Component {

    state = {
        events: [],
        loading: true,
        error: ''
    }

    render() {
        const {loading, error} = this.state;

        return (
            <Layout>
                <div className="container">
                    <h3 className="mt-3 text-center">Admin</h3>
                    <Events />

                    <h3>Add event:</h3>
                    <form className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control mb-2" name="title" required />

                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control mb-2" name="description" required />

                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control mb-2" name="date" required />

                        <label htmlFor="start_time" className="form-label">Start Time</label>
                        <input type="time" className="form-control mb-2" name="start_time" required />

                        <label htmlFor="end_time" className="form-label">End Time</label>
                        <input type="time" className="form-control mb-2" name="start_time" />

                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" className="form-control mb-2" name="location" required />

                        <label htmlFor="multi_day" className="form-label">Multi-day?</label>
                        <input type="checkbox" className="mb-2 ms-2" name="multi_day" />

                        <br/>
                        <button className="btn btn-success" type="submit">
                            Submit <i className="fa-solid fa-check"></i>
                        </button>
                    </form>
                </div>
            </Layout>
        )
    }
}

export default AdminEvents