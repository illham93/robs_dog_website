import React from "react";
import Layout from "../../layout";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

import MembersList from "./membersList";
import AddMembers from "./addMembers";

class AdminMembers extends React.Component {

    state = {
        admin: false,
        error: '',
        members: [],
        nonMembers: [],
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
                const members = data.users.filter(user => user.member);
                const nonMembers = data.users.filter(user => !user.member);
                this.setState({
                    members: members,
                    nonMembers: nonMembers,
                });
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error retrieving users list'
                });
            });
    }

    render () {
        const { admin, error, members, nonMembers } = this.state;

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
                                    <MembersList members={members}/>
                                    <AddMembers nonMembers={nonMembers}/>
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