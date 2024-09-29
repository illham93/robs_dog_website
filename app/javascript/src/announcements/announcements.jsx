import React from "react";
import Layout from 'src/layout';
import './announcements.scss';
import { handleErrors } from '../utils/fetchHelper.js';

class Announcements extends React.Component {

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

    render () {
        const { announcements, error, loading } = this.state;

        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5">Announcements</h1>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">{error}</h3>
                ) : (
                    <div className="row">
                        {announcements.map(announcement => {
                            return (
                                <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center" key={announcement.id}>
                                    <div className="rounded announcement text-shadow p-3" style={{ width: '100%' }}>
                                        <h3>{announcement.title}</h3>
                                        <p>{announcement.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}

export default Announcements;