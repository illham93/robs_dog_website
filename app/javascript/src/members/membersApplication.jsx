import React from "react";
import { handleErrors } from "../utils/fetchHelper";

class MembersApplication extends React.Component {
    state = {
        loading: true,
        error: '',
    };

    render () {
        const { loading, error } = this.state;

        return (
            <h3>This is the member application page</h3>
        )
    }
}

export default MembersApplication