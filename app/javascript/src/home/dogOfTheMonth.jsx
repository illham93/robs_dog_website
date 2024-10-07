import React from "react";
import { handleErrors } from "../utils/fetchHelper";

class DogOfTheMonth extends React.Component {
    state = {
        dog: {},
        error: '',
        loading: true,
    }

    componentDidMount() {
        fetch('/api/dog-of-the-month')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    dog: data.dog,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not find Dog of the month.',
                    loading: false
                });
            });
    }

    render () {
        const { dog, error, loading } = this.state;

        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5">Dog of the Month</h1>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <p>test</p>
                )}
            </div>
        )
    }
}

export default DogOfTheMonth;