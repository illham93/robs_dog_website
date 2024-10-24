import React from "react";
import Layout from "../layout";
import Login from "../login/login";
import MembersApplication from './membersApplication';
import MembersArea from './membersArea';
import { handleErrors } from "../utils/fetchHelper";

class MembersHome extends React.Component {
    state = {
        authenticated: false,
        member: false,
        loading: true,
        error: '',
    };

    componentDidMount() {
        fetch('/api/authenticated')
            .then(handleErrors)
            .then(data => {
                this.setState({
                    authenticated: data.authenticated,
                    member: data.member,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Error authenticating user',
                    loading: false,
                });
            });
    }

    render () {
        const { authenticated, member, loading, error } = this.state;

        let content;

        if (loading) {
            content = <h3>Loading...</h3>;
        } else if (error) {
            content = <h3 className="text-danger mt-2">Error: {error}</h3>;
        } else if (!authenticated) {
            content = (
                <>
                    <div className="container">
                        <h3 className="text-center mt-5">You must be logged in before you can view the members area</h3>
                        <Login />
                    </div>
                </>
            );
        } else if (authenticated && !member) {
            content = <MembersApplication />;
        } else if (authenticated && member) {
            content = <MembersArea />;
        }

        return (
            <Layout>
                {content}
            </Layout>
        );
    }
}

export default MembersHome