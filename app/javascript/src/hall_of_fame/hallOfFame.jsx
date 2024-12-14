import React from "react";

class HallOfFame extends React.Component {

    state = {
        dogs: [],
        loading: true,
        error: '',
    }

    render() {
        const {dogs, loading, error} = this.state;

        return (
            <div>Under development</div>
        );
    }
}

export default HallOfFame;