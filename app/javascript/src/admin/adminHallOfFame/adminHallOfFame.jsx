import React from "react";

class AdminHallOfFame extends React.Component {

    state = {
        dogs: [],
        loading: true,
        error: '',
    }

    render() {
        const {dogs, loading, error} = this.state;

        return (
            <div>This is the hall of fame</div>
        );
    }
}

export default AdminHallOfFame;