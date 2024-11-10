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
            <div className="container text-center mt-3">
                <h3>Members Area</h3>
                <h3>*Under Development*</h3>
            </div>
        )
    }
}

export default MembersArea