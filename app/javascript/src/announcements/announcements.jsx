import React from "react";
import Layout from 'src/layout';
import './announcements.scss';
import { handleErrors } from '../utils/fetchHelper.js';

class Announcements extends React.Component {

    state = {
        announcements: [],
        error: '',
        loading: true,
    }

    componentDidMount() {
        fetch('/api/announcements')
            .then(handleErrors)
            .then(data => {
                this.setState({
                    announcements: data.announcements,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not find announcements.'
                });
            });
    }

    render () {
        return (
            <div>
                <h1 className="text-center mt-5">Announcements</h1>
            </div>
        )
    }
}

export default Announcements;