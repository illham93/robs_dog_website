import React from "react";
import { handleErrors, safeCredentialsFormData } from "../../utils/fetchHelper";

class AddSponsor extends React.Component {

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

    submit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const image = document.getElementById('image-select').files[0];

        if (image) {
            formData.append('image', image);
        }

        fetch ('/api/sponsors', safeCredentialsFormData({
            method: 'POST',
            body: formData,
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('successMessage', 'Sponsor added successfully');
                window.location.reload();
                console.log('Sponsor added successfully', data);
            } else {
                console.error('Error adding sponsor', data);
                this.setState({error: error.error || 'Error adding sponsor'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({error: error.error || 'Error adding sponsor'});
        })
    }

    render () {
        const { error, successMessage } = this.state;
        return (
            <>
                <h4 className="text-center">Add sponsor:</h4>

                {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}
                
                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <div className="row justify-content-center">
                        <div className="rounded-grey-background text-shadow mt-3 col-md-9 col-lg-6">
                            <form encType="multipart/form-data" onSubmit={this.submit}>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-success" type="submit" title="Submit">
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                </div>
                                <p>Image: 
                                    <input id="image-select" className="ms-1" type="file" name="image" accept="image/*" required/>
                                </p>
                                <p>Title: 
                                    <input className="form-control" name="title" required />
                                </p>
                                <p>URL: 
                                    <input className="form-control" name="url" placeholder="Link (Optional) *Include the full URL that starts with https://" />
                                </p>
                                <p>Category:
                                    <select className="form-select" name="category" defaultValue="" required>
                                        <option value="" disabled>Select</option>
                                        <option value="Puppy">Puppy</option>
                                        <option value="Gun Dog">Gun Dog</option>
                                        <option value="Hunting Retriever">Hunting Retriever</option>
                                        <option value="Hunting Retriever Champion">Hunting Retriever Champion</option>
                                        <option value="Grand Hunting Retriever Champion">Grand Hunting Retriever Champion</option>
                                    </select>
                                </p>
                            </form>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default AddSponsor;