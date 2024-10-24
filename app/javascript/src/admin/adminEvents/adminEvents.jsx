import React from "react";
import Layout from "../../layout";
import Events from '../../events/events'
import '../../events/events.scss'

class AdminEvents extends React.Component {

    state = {
        events: [],
        loading: true,
        error: ''
    }

    render() {
        const {loading, error} = this.state;

        return (
            <Layout>
                <div className="container">
                    <h3 className="mt-3 text-center">Admin</h3>
                    <Events />

                    <h3>Add event:</h3>
                </div>
            </Layout>
        )
    }
}

export default AdminEvents