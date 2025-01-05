import React from "react";
import { handleErrors, safeCredentialsFormData, safeCredentials } from "../../utils/fetchHelper";

class EditSponsor extends React.Component {

    state = {
        error: '',
        successMessage: '',
        sponsors: [],
        editId: null,
    }

    componentDidMount() {
        const successMessage = sessionStorage.getItem('successMessage');
        if (successMessage) {
            this.setState({ successMessage });
            sessionStorage.removeItem('successMessage');
        }

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
        const { error, successMessage, sponsors } = this.state;
        return (
            <>
                <h4 className="text-center mt-4">Edit sponsors:</h4>

                {successMessage && <h3 className="alert alert-success mt-3">{successMessage}</h3>}
                
                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <div className="rounded-grey-background mt-4 text-center">
                        {sponsors.map(sponsor => {
                            return (
                                <div key={sponsor.id} className="d-inline-block text-center m-3">
                                    <div>
                                        <button className="btn btn-primary me-2 mb-2" onClick={(e) => this.edit(e, sponsor.id)} title="Edit">
                                            <i className="fa-solid fa-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger mb-2" title="Delete" onClick={(e) => this.delete(e, sponsor.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                    <img className="sponsor-image mb-2" src={sponsor.image_url} alt={sponsor.title} />
                                    <h5>Title: {sponsor.title}</h5>
                                    <h5>Category: {sponsor.category}</h5>
                                    <h5>Url: {sponsor.url}</h5>
                                </div>
                            )
                        })}
                    </div>
                )}
            </>
        )
    }
}

export default EditSponsor;