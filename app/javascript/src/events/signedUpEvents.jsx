import React from "react";
import { handleErrors } from "../utils/fetchHelper";

class SignedUpEvents extends React.Component {

    state = {
        eventSignups: [],
        loading: true,
        error: '',
        authenticated: false,
        user_id: '',
        loadingAuthentication: true,
    }

    componentDidMount() {
        fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
            this.setState({
                authenticated: data.authenticated,
                user_id: data.user_id,
                loadingAuthentication: false,
            });
            // fetch request to get event signups
            fetch(`/api/event_signups_by_user/${data.user_id}`)
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    eventSignups: data,
                    loading: false,
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error retrieving event signups',
                    loading: false,
                })
            })
        })
        .catch(error => {
            this.setState({
                error: error.error || 'Error authenticating user',
                loadingAuthentication: false,
            });
        });
    }

    render() {

        const {eventSignups, loading, loadingAuthentication, error, authenticated} = this.state;

        return (
            <div>
                <h3>Events you have signed up for:</h3>

                {loadingAuthentication && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <div>
                        {authenticated ? (
                            <>
                                {loading ? (<h3>Loading...</h3>) : (
                                    <>
                                        {eventSignups.length > 0 ? (
                                            <ul>
                                                {eventSignups.map(signup => (
                                                    <li key={signup.id}>
                                                        <h4>{signup.event.date} : <a href={`/events/${signup.event.id}`}>{signup.event.title}</a></h4>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <h5>You have not signed up for any events.</h5>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <h5>You must be logged in to access this feature. Click <a href="/login">here</a> to log in.</h5>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default SignedUpEvents