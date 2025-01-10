import React from "react";
import { handleErrors } from "../utils/fetchHelper";
import SignedUpEvents from "../events/signedUpEvents";

class MembersArea extends React.Component {
    state = {
        loading: true,
        error: '',
        announcements: [],
    };

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
        const { loading, error, announcements } = this.state;

        const memberAnnouncements = announcements.filter(announcement => announcement.members_only);

        return (
            <div className="container mt-3">
                
                <h1 className="mt-5 text-center">Members Area</h1>
                <h3 className="mt-5 mb-3 text-center">Member Announcements:</h3>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <>
                        {memberAnnouncements.length === 0 ? (
                            <h5 className="text-center">There are no member announcements at this time</h5>
                        ) : (
                            <div className="row">
                                {memberAnnouncements.map(announcement => {
                                    const dateTime = new Date(announcement.created_at);
                                    const date = dateTime.toLocaleDateString();
                                    return (   
                                        <div className="col-12 col-lg-6 mb-4 d-flex justify-content-center" key={announcement.id}>      
                                            <a href={announcement.link} className="text-decoration-none text-white d-flex w-100 h-100" target="_blank" rel="noopener noreferrer">                           
                                                <div className="rounded-grey-background text-shadow p-3" style={{ width: '100%' }}>                                       
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
                    </>
                )}
                <hr className="mt-5 white-horizontal-line"/>
                <SignedUpEvents />
            </div>
        )
    }
}

export default MembersArea