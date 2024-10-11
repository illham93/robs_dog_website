import React from "react";
import Layout from "../../layout";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

import MembersList from "./membersList";
import AddMembers from "./addMembers";

class AdminMembers extends React.Component {

    state = {
        admin: false,
        error: '',
        users: [],
    }

    componentDidMount() {
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

        fetch('/api/users')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    users: data.users,
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error retrieving users list'
                });
            });
    }

    render () {
        const { admin, error } = this.state;

        return (
            <Layout>
                <div className="container">
                    {admin ? (
                        <>
                            {error ? (
                                <h3 className="text-danger mt-2">Error: {error}</h3>
                            ) : (
                                <>
                                    <h1 className="text-center m-5">Admin Members</h1>
                                    <MembersList />
                                    <AddMembers />
                                </>
                            )}
                        </>
                    ) : (
                        <h3 className="text-center mt-5">You are not authorized to be here</h3>
                    )}
                </div>
            </Layout>
        )
    }
}

export default AdminMembers;