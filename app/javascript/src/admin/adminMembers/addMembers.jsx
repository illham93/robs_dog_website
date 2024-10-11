import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

class AddMembers extends React.Component {

    state = {
        error: '',
        loading: true,
    }

    render () {
        const { error, loading } = this.state;

        return (
            <>
                <h3 className="text-center mt-5 mb-5">Add Members</h3>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">Error: {error}</h3>
                ) : (
                    <></>
                )}
            </>
        )
    }
}

export default AddMembers