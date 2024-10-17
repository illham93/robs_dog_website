import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

class AddMembers extends React.Component {

    state = {
        searchQuery: '',
        selectedUser: null,
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

        const { searchQuery, selectedUser } = this.state;


        return (
            <>
                <h3 className="text-center mt-5 mb-5">Add Members</h3>
                <h5>Search for user by email:</h5>
                <input type="text" placeholder="Enter entire email" value={searchQuery} onChange={this.handleSearch} className="form-control mb-3"/>
                {searchQuery && !selectedUser ? (
                    <h5>Cannot find a user with that email</h5>
                ) : (
                    selectedUser && <h5>{selectedUser.email}</h5>
                )}
            </>
        )
    }
}

export default AddMembers