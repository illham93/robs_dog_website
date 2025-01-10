import React from "react";
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

        const publicAnnouncements = announcements.filter(announcement => !announcement.members_only);

        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5">Announcements</h1>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <div className="row">
                        {publicAnnouncements.map(announcement => {
                            const dateTime = new Date(announcement.created_at);
                            const date = dateTime.toLocaleDateString();
                            return (   
                                <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center" key={announcement.id}>      
                                    <a href={announcement.link} className="text-decoration-none text-white d-flex w-100 h-100" target="_blank" rel="noopener noreferrer">                           
                                        <div className="rounded announcement text-shadow p-3" style={{ width: '100%' }}>                                       
                                            <h3>{announcement.title}</h3>
                                            <h5>{date}</h5>
                                            <p>{announcement.content}</p>                                        
                                        </div>
                                    </a>
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