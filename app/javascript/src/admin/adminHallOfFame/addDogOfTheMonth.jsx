import React from "react";
import { handleErrors, safeCredentials, safeCredentialsFormData } from "../../utils/fetchHelper";

class AddDogOfTheMonth extends React.Component {

    state = {
        error: '',
        successMessage: '',
    }

    componentDidMount() {
        const successMessage = sessionStorage.getItem('successMessage');
        if (successMessage) {
            this.setState({ successMessage });
            sessionStorage.removeItem('successMessage');
        }
    }

    save = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = document.getElementById('image-select').files[0];

        if (image) {
            formData.append('image', image);
        }

        fetch(`/api/dog-of-the-month`, safeCredentialsFormData({
            method: 'POST',
            body: formData
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('successMessage', 'Dog of the month added successfully');
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
        const { error, successMessage } = this.state;

        return (
            <div className="container">
                <h3 className="text-center mt-5 mb-3">Add new Dog of the Month</h3>
                <p className="text-center">This also sets it as the current dog of the month. You can edit the active dog of the month below.</p>

                {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}
                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <div className="rounded dog-of-the-month text-shadow mx-auto mb-5">
                        <>
                            <form encType="multipart/form-data" onSubmit={this.save}>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-success" type="submit">
                                        <i className="fa-regular fa-floppy-disk"></i>
                                    </button>
                                </div>
                                <p>Image: <input id="image-select" type="file" name="image" accept="image/*" /></p>
                                <p>Call name:<input className="form-control" name="call_name"/></p>
                                <p>Registered name:<input className="form-control" name="registered_name"/></p>
                                <p>Titles:<input className="form-control" name="titles"/></p>
                                <p>Owner:<input className="form-control" name="owner"/></p>
                                <p>About:<textarea className="form-control" name="about"/></p>
                            </form>
                        </>
                    </div>
                )}
            </div>
        )
    }
}

export default AddDogOfTheMonth;