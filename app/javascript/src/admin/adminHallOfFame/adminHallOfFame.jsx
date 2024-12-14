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
            <h3 className="text-center">Past dogs of the month</h3>
        );
    }
}

export default AdminHallOfFame;