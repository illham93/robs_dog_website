import React from "react";
import Layout from "../../layout";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";
import EditAnnouncements from "./editAnnouncements";

import './adminHome.scss';
import EditDogOfTheMonth from "./editDogOfTheMonth";

class AdminHome extends React.Component {

    state = {
        admin: false,
        error: '',
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
    }

    render () {
        const { admin, error } = this.state;

        return (
            <Layout>
                {admin ? (
                    <>
                        <h1 className="text-center m-5">Admin Home</h1>
                        <EditAnnouncements />
                    </>
                ) : (
                    <h3 className="text-center mt-5">You are not authorized to be here</h3>
                )}
            </Layout>
        )
    }
}

export default AdminHome;