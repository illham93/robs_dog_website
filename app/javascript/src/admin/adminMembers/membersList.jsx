import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

class MembersList extends React.Component {

    state = {
        members: [],
        error: '',
        loading: true,
    }

    render () {
        const { members, error, loading } = this.state;

        return (
            <>
                <h3 className="text-center mt-5 mb-5">Members List</h3>

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

export default MembersList