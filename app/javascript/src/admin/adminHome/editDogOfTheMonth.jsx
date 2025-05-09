import React from "react";
import { handleErrors, safeCredentials, safeCredentialsFormData } from "../../utils/fetchHelper";

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

    save = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = document.getElementById('image-select').files[0];

        if (image) {
            formData.append('image', image);
        }

        fetch(`/api/dog-of-the-month`, safeCredentialsFormData({
            method: 'PUT',
            body: formData
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                window.location.reload();
                console.log('Dog of the month updated successfully', data);
            } else {
                console.error('Error updating dog of the month', data);
                this.setState({ error: error.error || 'Error updating dog of the month'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error updating dog of the month'});
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
                                <form encType="multipart/form-data" onSubmit={this.save}>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-success" type="submit">
                                            <i className="fa-regular fa-floppy-disk"></i>
                                        </button>
                                    </div>
                                    <p>Image: <input id="image-select" type="file" name="image" accept="image/*" /></p>
                                    <p>Call name:<input className="form-control" defaultValue={dog.call_name} name="call_name"/></p>
                                    <p>Registered name:<input className="form-control" defaultValue={dog.registered_name} name="registered_name"/></p>
                                    <p>Titles:<input className="form-control" defaultValue={dog.titles} name="titles"/></p>
                                    <p>Owner:<input className="form-control" defaultValue={dog.owner} name="owner"/></p>
                                    <p>About:<textarea className="form-control" defaultValue={dog.about} name="about"/></p>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={this.edit}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </button>
                                </div>
                                <h3 className="text-center">{dog.call_name}</h3>
                                <img className="dog-of-the-month-image" src={dog.image_url}></img>
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