import React from "react";
import { handleErrors, safeCredentialsFormData, safeCredentials } from "../../utils/fetchHelper";

class EditSponsor extends React.Component {

    state = {
        error: '',
        successMessage: '',
        sponsors: [],
        editId: null,
        admin: false,
    }

    componentDidMount() {
        const successMessage = sessionStorage.getItem('successMessage');
        if (successMessage) {
            this.setState({ successMessage });
            sessionStorage.removeItem('successMessage');
        }

        fetch('/api/authenticated')
        .then(handleErrors)
        .then(data => {
            if (data.admin) {
                this.setState({
                    admin: true,
                })
            }
        })
        .catch(error => {
            this.setState({
                error: error.error || 'Error authenticating user'
            });
        });

        fetch('/api/sponsors')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    sponsors: data.sponsors,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not load sponsors',
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

        fetch(`/api/sponsors/${id}`, safeCredentialsFormData({
            method: 'PUT',
            body: formData,
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('successMessage', 'Sponsor updated successfully');
                window.location.reload();
                console.log('Sponsor updated successfully', data);
            } else {
                console.error('Error updating sponsor', data);
                this.setState({ error: error.error || 'Error updating sponsor'});
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error updating sponsor'});
        })
    }

    delete(e, id) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this sponsor?')) {
            fetch(`/api/sponsors/${id}`, safeCredentials({
                method: 'DELETE',
            }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('successMessage', 'Sponsor deleted successfully');
                    window.location.reload();
                } else {
                    console.error('Error deleting sponsor', data);
                    this.setState({ error: error.error || 'Error deleting sponsor'});
                }
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not delete sponsor'
                });
            });
        };
    }

    render () {
        const { error, successMessage, sponsors, editId, admin } = this.state;
        return (
            <>
                {admin && (
                    <>
                        <h4 className="text-center mt-4">Edit sponsors:</h4>

                        {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}
                        
                        {error ? (
                            <h3 className="text-danger mt-2">Error: {error}</h3>
                        ) : (
                            <div className="rounded-grey-background mt-4">
                                {sponsors.map(sponsor => (
                                        <div key={sponsor.id} className="m-3">
                                            {editId === sponsor.id ? (
                                                // Editing version
                                                <form onSubmit={(e) => this.save(e, sponsor.id)} key={sponsor.id}>
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <img className="sponsor-image mb-2" src={sponsor.image_url} alt={sponsor.title} />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="d-flex justify-content-end w-100">
                                                                <button className="btn btn-success me-2 mb-2" type="submit" title="Save">
                                                                    <i className="fa-regular fa-floppy-disk"></i>
                                                                </button>
                                                                <button className="btn btn-danger mb-2" title="Delete" onClick={(e) => this.delete(e, sponsor.id)}>
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                            </div>

                                                            <div className="d-flex align-items-center mb-2 w-100">
                                                                <h5 className="me-2">Title:</h5>
                                                                <input className="form-control flex-fill" name="title" defaultValue={sponsor.title} required/>
                                                            </div>

                                                            <div className="d-flex align-items-center mb-2 w-100">
                                                                <h5 className="me-2">URL:</h5>
                                                                <input className="form-control flex-fill" name="url" defaultValue={sponsor.url} required />
                                                            </div>

                                                            <div className="d-flex align-items-center mb-2 w-100">
                                                                <h5 className="me-2">Category:</h5>
                                                                <select className="form-select flex-fill" name="category" defaultValue={sponsor.category} required>
                                                                    <option value="" disabled>Select</option>
                                                                    <option value="Started Hunting Retriever">Started Hunting Retriever</option>
                                                                    <option value="Hunting Retriever">Hunting Retriever</option>
                                                                    <option value="Hunting Retriever Champion">Hunting Retriever Champion</option>
                                                                    <option value="Grand Hunting Retriever Champion">Grand Hunting Retriever Champion</option>
                                                                    <option value="Hall of Fame">Hall of Fame</option>
                                                                </select>
                                                            </div>

                                                            <div className="d-flex align-items-center mb-2 w-100">
                                                                <h5 className="me-2 mb-0 text-nowrap">Expiry Date:</h5>
                                                                <input className="form-control" name="expiry_date" type="date" defaultValue={sponsor.expiry_date} />
                                                            </div>

                                                            <p>Image: 
                                                                <input id="image-select" className="ms-1" type="file" name="image" accept="image/*" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </form>
                                            ) : (
                                                // Non-editing version
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img className="sponsor-image mb-2" src={sponsor.image_url} alt={sponsor.title} />
                                                    </div>
                                                    <div className="col-8">
                                                        <div className="d-flex justify-content-end w-100">
                                                            <button className="btn btn-primary me-2 mb-2" onClick={(e) => this.edit(e, sponsor.id)} title="Edit">
                                                                <i className="fa-solid fa-pencil"></i>
                                                            </button>
                                                            <button className="btn btn-danger mb-2" title="Delete" onClick={(e) => this.delete(e, sponsor.id)}>
                                                                <i className="fa-solid fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                        <h5>Title: {sponsor.title}</h5>
                                                        <h5>URL: {sponsor.url}</h5>
                                                        <h5>Category: {sponsor.category}</h5>
                                                        <h5>Expiry date:&nbsp;
                                                            {sponsor.expiry_date ?? 'None'}
                                                        </h5>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </>
                )}
            </>
        )
    }
}

export default EditSponsor;