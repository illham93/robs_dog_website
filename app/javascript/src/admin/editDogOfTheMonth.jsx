import React from "react";
import { handleErrors, safeCredentials } from "../utils/fetchHelper";

class EditDogOfTheMonth extends React.Component {

    state = {
        dog: [],
        editing: false,
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
                    error: error.error || 'Could not find Dog of the Month.',
                    loading: false
                });
            });
    }

    edit = () => {
        this.setState({ editing: true });
    }

    save = (e, id) => {
        e.preventDefault();
        const form = new FormData(e.target);

        fetch(`/api/announcements/${id}`, safeCredentials({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.get('title'),
                content: form.get('content'),
                link: form.get('link'),
            })
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                window.location.reload();
                console.log('announcement updated successfully', data);
            } else {
                console.error('Error updating announcement', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error updating announcement'});
        })
    }

    render () {
        const { dog, editing, error, loading } = this.state;

        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5">Dog of the Month</h1>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <div className="rounded dog-of-the-month text-shadow mx-auto mb-5">

                        {editing ? (
                            <>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-success me-2" type="submit">
                                        <i className="fa-regular fa-floppy-disk"></i>
                                    </button>
                                </div>
                                <p>Call name:<input className="form-control"/></p>
                                <p>Registered name:<input className="form-control"/></p>
                                <p>Titles:<input className="form-control"/></p>
                                <p>Owner:<input className="form-control"/></p>
                                <p>About:<textarea className="form-control"/></p>
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={this.edit}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                </div>
                                <img src={dog.image_url}></img>
                                <h3 className="text-center">{dog.call_name}</h3>
                                <h5>Registered name: {dog.registered_name}</h5>
                                <h5>Titles: {dog.titles}</h5>
                                <h5>Owner: {dog.owner}</h5>
                                <p>{dog.about}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default EditDogOfTheMonth;