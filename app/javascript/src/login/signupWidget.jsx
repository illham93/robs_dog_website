import React from "react";
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class SignupWidget extends React.Component {
    state = {
        email: '',
        password: '',
        passwordConfirm: '',
        first_name: '',
        last_name: '',
        error: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    signup = (e) => {
        if (e) {e.preventDefault();}
        this.setState({
            error: '',
        });

        if (this.state.password !== this.state.passwordConfirm) {
            alert('Password confirmation does not match')
            return;
        }

        fetch('/api/users', safeCredentials({
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
            })
        }))
            .then(handleErrors)
            .then(data => {
                if (data.user) {
                    this.login();
                }
            })
            .catch(error => {
                this.setState({
                    error: error.error || 'Could not sign up',
                })
            })
    }

    login = (e) => {
        if (e) {e.preventDefault();}
        this.setState({
            error: '',
        });

        fetch('/api/sessions', safeCredentials({
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password,
                }
            })
        }))
            .then(handleErrors)
            .then(data => {
                if (data.success) {
                    const params = new URLSearchParams(window.location.search);
                    const redirect_url = params.get('redirect_url') || '/';
                    window.location = redirect_url;
                }
            })
            .catch(error => {
                this.setState({
                    error: 'Could not log in.'
                })
            })
    }

    render () {
        const {email, password, passwordConfirm, first_name, last_name, error} = this.state;
        return (
            <React.Fragment>
                <form onSubmit={this.signup}>
                    <input name="first_name" type="text" className="form-control form-control-lg mb-3" placeholder="First Name" value={first_name} onChange={this.handleChange} required />
                    <input name="last_name" type="text" className="form-control form-control-lg mb-3" placeholder="Last Name" value={last_name} onChange={this.handleChange} required />
                    <input name="email" type="text" className="form-control form-control-lg mb-3" placeholder="Email" value={email} onChange={this.handleChange} required />
                    <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={password} onChange={this.handleChange} required />
                    <input name="passwordConfirm" type="password" className="form-control form-control-lg mb-3" placeholder="Confirm Password" value={passwordConfirm} onChange={this.handleChange} required />
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
                </form>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <hr/>
                <p className="mb-0">Already have an account? <a className="text-primary" onClick={this.props.toggle}>Log in</a></p>
            </React.Fragment>
        )
    }
}

export default SignupWidget