import React from "react";
import { handleErrors } from "../utils/fetchHelper";

class MembersArea extends React.Component {
    state = {
        loading: true,
        error: '',
    };

    render () {
        const { loading, error } = this.state;

        return (
            <h3>This is the members area page</h3>
        )
    }
}

export default MembersArea