import React from "react";
import { safeCredentialsFormData, handleErrors } from "../../utils/fetchHelper";

class AddMembers extends React.Component {

    state = {
        searchQuery: '',
        selectedUser: null,
        error: '',
    }

    addMember = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch(`/api/users/${id}/add-member`, safeCredentialsFormData({
            method: 'PUT',
            body: formData,
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                window.location.reload();
                console.log('Member added successfully', data);
            } else {
                console.error('Error adding member', data);
                this.setState({error: error.error || 'Error adding member'});
            }
        })
        .catch(error => {
            console.error('Error: ', error);
            this.setState({error: error.error || 'Error adding member'});
        })
    }

    handleSearch = (e) => {
        const { nonMembers } = this.props;
        const searchQuery = e.target.value;
        this.setState({ searchQuery: searchQuery });
        const selectedUser = nonMembers.find(
            user => user.email.toLowerCase() === searchQuery.toLowerCase()
        );
        this.setState({ selectedUser });
    }

    render () {

        const { searchQuery, selectedUser, error } = this.state;


        return (
            <>
                <h3 className="text-center mt-5 mb-5">Add Members</h3>
                <h5>Search for user by email:</h5>
                <input type="text" placeholder="Enter entire email" value={searchQuery} onChange={this.handleSearch} className="form-control mb-3"/>
                {searchQuery && !selectedUser ? (
                    <h5>Cannot find a user with that email</h5>
                ) : (
                    selectedUser && (
                        <>
                            <h5>User found</h5>
                            <h5>Enter additional information for user:</h5>
                            <form onSubmit={(e) => this.addMember(e, selectedUser.id)} encType="multipart/form-data">
                                <label for="first_name" className="form-label">First name</label>
                                <input type="text" className="form-control mb-2" name="first_name" required/>

                                <label for="last_name" className="form-label">Last name</label>
                                <input type="text" className="form-control mb-2" name="last_name" required/>

                                <label for="phone" className="form-label">Phone</label>
                                <input type="tel" className="form-control mb-2" name="phone" required/>

                                <label for="town" className="form-label">Town</label>
                                <input type="text" className="form-control mb-2" name="town" required/>

                                <div className="mt-3">
                                    <h5 className="d-inline">Make this user a member?</h5>
                                    <button className="btn btn-success ms-2" type="submit">
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </form>
                            {error && <h3 className="text-danger mt-2"> Error: {error}</h3>}
                        </>
                    )
                )}
            </>
        )
    }
}

export default AddMembers