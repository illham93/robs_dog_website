import React from "react";
import { handleErrors } from "../../utils/fetchHelper";

class AdminHallOfFame extends React.Component {

    state = {
        dogs: [],
        loading: true,
        error: '',
    }

    componentDidMount() {
        fetch('/api/dog-of-the-month')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    dogs: data.dogs,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not load Dog of the month.',
                    loading: false
                });
            });
    }

    render() {
        const {dogs, loading, error} = this.state;

        return (
            <div className="container">
                <h3 className="text-center">Past dogs of the month</h3>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <>
                        {dogs.map(dog => {
                            return (
                                <div className="rounded-grey-background mt-3 mb-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Registered name: {dog.registered_name}</h5>
                                            <h5>Call name: {dog.call_name}</h5>
                                            <h5>Owner: {dog.owner}</h5>
                                            <h5>Titles: {dog.titles}</h5>
                                            <h5>About:</h5>
                                            <h5>{dog.about}</h5>
                                        </div>
                                        <div className="col-md-6 text-end">
                                            <img className="admin-dog-of-the-month-image" src={dog.image_url}></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )}

            </div>
        );
    }
}

export default AdminHallOfFame;