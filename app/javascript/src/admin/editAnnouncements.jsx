import React from "react";
import { handleErrors, safeCredentials } from "../utils/fetchHelper";

class EditAnnouncements extends React.Component {

    state = {
        announcements: [],
        editId: null,
        error: '',
        loading: true,
    }

    componentDidMount() {
        fetch('/api/announcements')
            .then(handleErrors)
            .then(data => {
                console.log(data);
                this.setState({
                    announcements: data.announcements,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not find announcements.',
                    loading: false
                });
            });
    }

    create(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        fetch('/api/announcements', safeCredentials({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.get('title'),
                content: form.get('content'),
                link: form.get('link'),
            })
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                window.location.reload();
                console.log('Announcement added successfully', data);
            } else {
                console.error('Error adding announcement', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error adding announcement'});
        })
    }

    edit(e, id) {
        e.preventDefault();
        this.setState({ editId: id });
    };

    save = (e, id) => {
        e.preventDefault();
        const form = new FormData(e.target);

        fetch(`/api/announcements/${id}`, safeCredentials({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: form.get('title'),
                content: form.get('content'),
                link: form.get('link'),
            })
        }))
        .then(handleErrors)
        .then(data => {
            if (data.success) {
                window.location.reload();
                console.log('announcement updated successfully', data);
            } else {
                console.error('Error updating announcement', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: error.error || 'Error updating announcement'});
        })
    }

    delete(e, id) {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this announcement?')) {
            fetch(`/api/announcements/${id}`, safeCredentials({
                method: 'DELETE',
            }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    this.setState(prevState => ({
                        announcements: prevState.announcements.filter(announcement => announcement.id !== id)
                    }))
                    console.log(data);
                }
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not delete announcement'
                });
            });
        };
    }

    render () {
        const { announcements, error, loading } = this.state;

        return (
            <div className="container">
                <h1 className="text-center mt-5 mb-5">Announcements</h1>

                {loading && <h3>Loading...</h3>}

                {error ? (
                    <h3 className="text-danger mt-2">{error}</h3>
                ) : (
                    <div>
                        {announcements.map(announcement => {
                            return (
                                <form onSubmit={(e) => this.save(e, announcement.id)} key={announcement.id}>
                                    <div className="admin-announcement rounded p-3 mb-3 position-relative" >
                                        {this.state.editId === announcement.id ? (
                                            <>
                                                <div className="d-flex align-items-center justify-content-between mb-2">
                                                    <input 
                                                        id={`announcement-title-${announcement.id}`} 
                                                        className="form-control flex-grow-1 me-2 edit-announcement-title" 
                                                        defaultValue={announcement.title} 
                                                        name="title" 
                                                        type="text" 
                                                        required
                                                    />
                                                    <button className="btn btn-success me-2" type="submit">
                                                        <i className="fa-regular fa-floppy-disk"></i>
                                                    </button>
                                                    <button className="btn btn-danger" onClick={(e) => this.delete(e, announcement.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button> 
                                                </div>
                                                <textarea 
                                                    id={`announcement-content-${announcement.id}`} 
                                                    className="form-control mb-2" 
                                                    defaultValue={announcement.content} 
                                                    name="content" 
                                                    required
                                                />
                                                <input
                                                    id={`announcement-link-${announcement.id}`}
                                                    className="form-control"
                                                    defaultValue={announcement.link}
                                                    name="link"
                                                    placeholder="Link (Optional) *Include the full URL that starts with https://" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h3 id={`admin-announcement-title-${announcement.id}`} className="flex-grow-1 me-2">{announcement.title}</h3>
                                                    <button className="btn btn-primary me-2" onClick={(e) => this.edit(e, announcement.id)}>
                                                        <i className="fa-solid fa-pencil"></i>
                                                    </button>
                                                    <button className="btn btn-danger" onClick={(e) => this.delete(e, announcement.id)}>
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button> 
                                                </div>
                                                <p id={`admin-announcement-content-${announcement.id}`}>{announcement.content}</p>
                                            </>
                                        )}
                                    </div>
                                </form>
                            )
                        })}
                        <h5>Add new announcement:</h5>
                        <form onSubmit={(e) => this.create(e)}>
                            <div className="admin-announcement rounded p-3 mb-3 position-relative" >
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <input 
                                        id="new-announcement-title"
                                        className="form-control flex-grow-1 me-2 edit-announcement-title" 
                                        name="title" 
                                        type="text"
                                        placeholder="Title"
                                        required
                                    />
                                    <button className="btn btn-success me-2" type="submit">
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                </div>
                                <textarea 
                                    id="new-announcement-content"
                                    className="form-control mb-2" 
                                    name="content" 
                                    placeholder="Content"
                                    required
                                />
                                <input
                                    id="new-announcement-link"
                                    className="form-control"
                                    name="link"
                                    placeholder="Link (Optional) *Include the full URL that starts with https://" />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}

export default EditAnnouncements;