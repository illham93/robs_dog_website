import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

class MembersList extends React.Component {

    state = {
        error: '',
    }

    render () {

        const {members} = this.props;

        return (
            <>
                <h3 className="text-center mt-5 mb-5">Members List</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <td>Last Name</td>
                                <td>First Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Town</td>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => {
                                return (
                                    <tr>
                                        <td>{member.last_name}</td>
                                        <td>{member.first_name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.phone}</td>
                                        <td>{member.town}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default MembersList