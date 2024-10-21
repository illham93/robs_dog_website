import React from "react";
import { safeCredentials, handleErrors } from "../../utils/fetchHelper";

class MembersList extends React.Component {

    state = {
        editId: null,
        editingMember: {},
        error: '',
    }

    edit(e, member) {
        e.preventDefault();
        this.setState({ 
            editId: member.id,
            editingMember: { ...member },
        });
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState(prevState => ({
            editingMember: {
                ...prevState.editingMember,
                [name]: value,
            }
        }));
    }

    save = (e, id) => {
        e.preventDefault();
        const {editingMember} = this.state;

        fetch(`/api/users/${id}`, safeCredentials({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingMember),
        }))
        .then(handleErrors)
        .then (data => {
            sessionStorage.setItem('successMessage', 'Member updated successfully');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error updating user'});
        })
    }

    render () {

        const {error, editId, editingMember} = this.state;
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
                                <td>Edit</td>
                                <td>Remove</td>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => {
                                return (
                                    <tr key={member.id}>
                                        {editId === member.id ? (
                                            <>
                                                <td><input type="text" name="last_name" value={editingMember.last_name} onChange={this.handleChange} className="form-control"/></td>
                                                <td><input type="text" name="first_name" value={editingMember.first_name} onChange={this.handleChange} className="form-control"/></td>
                                                <td>{member.email}</td>
                                                <td><input type="text" name="phone" value={editingMember.phone} onChange={this.handleChange} className="form-control"/></td>
                                                <td><input type="text" name="town" value={editingMember.town} onChange={this.handleChange} className="form-control"/></td>
                                                <td className="text-center">
                                                    <button className="btn btn-primary me-2" onClick={(e) => this.save(e, member.id)}>
                                                        <i className="fa-regular fa-floppy-disk"></i>
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-danger" onClick={(e) => this.delete(e, member.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{member.last_name}</td>
                                                <td>{member.first_name}</td>
                                                <td>{member.email}</td>
                                                <td>{member.phone}</td>
                                                <td>{member.town}</td>
                                                <td className="text-center">
                                                    <button className="btn btn-primary me-2" onClick={(e) => this.edit(e, member)}>
                                                        <i className="fa-solid fa-pencil"></i>
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-danger" onClick={(e) => this.delete(e, member)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </td>
                                            </>
                                        )}                       
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {error && <h3 className="text-danger mt-2"> Error: {error}</h3>}
            </>
        )
    }
}

export default MembersList