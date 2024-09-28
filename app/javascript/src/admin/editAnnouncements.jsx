import React from "react";
import { handleErrors, safeCredentials } from "../utils/fetchHelper";
import Announcements from "../announcements/announcements";

class EditAnnouncements extends React.Component {

    state = {
        announcements: [],
        error: '',
        loading: true,
    }

    componentDidMount() {
        fetch('/api/announcements')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    announcements: data.announcements,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not find announcements.',
                    loading: false
                });
            });
    }

    delete(id) {
        fetch(`/api/announcements/${id}`, safeCredentials({
            method: 'DELETE',
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                this.setState(prevState => ({
                    announcements: prevState.announcements.filter(announcement => announcement.id !== id)
                }))
                console.log(data);
            }
        })
        .catch(error => {
            this.setState({
                error: error.error || 'Could not delete announcement'
            });
        });
    }

    render () {
        const { announcements, error, loading } = this.state;

        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5">Announcements</h1>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3>{error}</h3>
                ) : (
                    <div>
                        {announcements.map(announcement => {
                            return (
                                <form onSubmit={this.handleSubmit} key={announcement.id}>
                                    <div className="admin-announcement rounded p-3 mb-3 position-relative" >
                                        <button className="btn btn-danger position-absolute m-2 top-0 end-0" onClick={() => this.delete(announcement.id)}>X</button>
                                        <h3>{announcement.title}</h3>
                                        <p>{announcement.content}</p>
                                    </div>
                                </form>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}

export default EditAnnouncements;