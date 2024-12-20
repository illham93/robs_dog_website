import React from "react";
import { handleErrors, safeCredentials, safeCredentialsFormData } from "../../utils/fetchHelper";

class AdminHallOfFame extends React.Component {

    state = {
        dogs: [],
        loading: true,
        error: '',
        editId: null,
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

    edit(e, id) {
        e.preventDefault();
        this.setState({ editId: id });
    }

    save = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = document.getElementById('image-select').files[0];

        if (image) {
            formData.append('image', image);
        }

        fetch(`/api/dog-of-the-month/${id}`, safeCredentialsFormData({
            method: 'PUT',
            body: formData,
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('successMessage', 'Dog of the month updated successfully');
                window.location.reload();
                console.log('Dog updated successfully', data);
            } else {
                console.error('Error updating dog', data);
                this.setState({ error: error.error || 'Error updating dog'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error updating dog'});
        })
    }

    delete(e, id) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this dog of the month?')) {
            fetch(`/api/dog-of-the-month/${id}`, safeCredentials({
                method: 'DELETE',
            }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('successMessage', 'Dog of the month deleted successfully');
                    window.location.reload();
                } else {
                    console.error('Error deleting dog', data);
                    this.setState({ error: error.error || 'Error deleting dog'});
                }
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not delete dog of the month'
                });
            });
        };
    }

    makeCurrent(e, id) {
        e.preventDefault();
        if (confirm('Are you sure you want to make this the current dog of the month?')) {
            fetch(`/api/dog-of-the-month/${id}/make-current`, safeCredentials({
                method: 'PUT',
            }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('successMessage', 'Successfully updated current dog of the month');
                    window.location.reload();
                } else {
                    console.error('Error updating current dog of the month', data);
                    this.setState({error: error.error || 'Error updating current dog of the month'})
                }
            })
            .catch(error => {
                this.setState({ error: error.error || 'Error updating current dog of the month'})
            });
        }
    }

    render() {
        const {dogs, loading, error, successMessage} = this.state;

        return (
            <div className="container">
                <h3 className="text-center">Past dogs of the month</h3>

                {loading && <h3>Loading...</h3>}

                {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <>
                        {dogs.map(dog => {
                            return (
                                <form onSubmit={(e) => this.save(e, dog.id)} key={dog.id}>
                                    <div className="rounded-grey-background mt-3 mb-3">
                                        {this.state.editId === dog.id ? (
                                            <div className="row">
                                                <div className="col-md-6">
                                                    {dog.current ? (
                                                        <button className="btn btn-warning me-2 mb-2 disabled-button" title="Current Dog of the Month" onClick={(e) => e.preventDefault()}>
                                                            <i class="fa-solid fa-star"></i>
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-success me-2 mb-2" onClick={(e) => this.makeCurrent(e, dog.id)} title="Make Current">
                                                            <i className="fa-solid fa-check"></i>
                                                        </button>
                                                    )}
                                                    <button className="btn btn-primary me-2 mb-2" type="submit" title="Save">
                                                        <i className="fa-regular fa-floppy-disk"></i>
                                                    </button>
                                                    <button className="btn btn-danger mb-2" title="Delete" onClick={(e) => this.delete(e, dog.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                    <h5>Registered name: </h5>
                                                    <input 
                                                        className="form-control mb-2"
                                                        defaultValue={dog.registered_name}
                                                        name="registered_name"
                                                        type="text"
                                                        required
                                                    />
                                                    <h5>Call name: </h5>
                                                    <input 
                                                        className="form-control mb-2"
                                                        defaultValue={dog.call_name}
                                                        name="call_name"
                                                        type="text"
                                                        required
                                                    />
                                                    <h5>Owner: </h5>
                                                    <input 
                                                        className="form-control mb-2"
                                                        defaultValue={dog.owner}
                                                        name="owner"
                                                        type="text"
                                                        required
                                                    />
                                                    <h5>Titles: </h5>
                                                    <input 
                                                        className="form-control mb-2"
                                                        defaultValue={dog.titles}
                                                        name="titles"
                                                        type="text"
                                                        required
                                                    />
                                                    <h5>About:</h5>
                                                    <textarea 
                                                        className="form-control mb-2"
                                                        defaultValue={dog.about}
                                                        name="about"
                                                        type="text"
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                                    <p>Image: <input id="image-select" type="file" name="image" accept="image/*" /></p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                <div className="col-md-6">
                                                    {dog.current ? (
                                                        <button className="btn btn-warning me-2 mb-2 disabled-button" title="Current Dog of the Month" onClick={(e) => e.preventDefault()}>
                                                            <i class="fa-solid fa-star"></i>
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-success me-2 mb-2" onClick={(e) => this.makeCurrent(e, dog.id)} title="Make Current">
                                                            <i className="fa-solid fa-check"></i>
                                                        </button>
                                                    )}
                                                    <button className="btn btn-primary me-2 mb-2" onClick={(e) => this.edit(e, dog.id)} title="Edit">
                                                        <i className="fa-solid fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-danger mb-2" title="Delete" onClick={(e) => this.delete(e, dog.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
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
                                        )}
                                    </div>
                                </form>
                            )
                        })}
                    </>
                )}

            </div>
        );
    }
}

export default AdminHallOfFame;