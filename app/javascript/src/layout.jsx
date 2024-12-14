import React, {useEffect, useState} from "react";
import './layout.scss';

const Layout = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [authenticityToken, setAuthenticityToken] = useState('');

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setAuthenticityToken(token);

        fetch('/api/authenticated', {
            method: 'GET',
            headers: {
                'X-CSRF-Token': token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.authenticated) {
                    setLoggedIn(true);
                    if (data.admin) {
                        setAdmin(true);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching authentication status:', error);
            });
    }, []);

    const logOut = () => {
        fetch('/api/sessions', {
            method: 'DELETE',
            headers: {
                'X-CSRF-Token': authenticityToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setLoggedIn(false);
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.error('Error logging out:', error);
            })
    };

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand" id="navbar">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/members">Members</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/events">Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/hall_of_fame">Hall of Fame</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {admin && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin</a>
                                    <div className="dropdown-menu" aria-labelledby="adminDropdown">
                                        <a className="dropdown-item" href="/admin/home">Home</a>
                                        <a className="dropdown-item" href="/admin/members">Members</a>
                                        <a className="dropdown-item" href="/admin/events">Events</a>
                                    </div>
                                </li>
                            )}
                            <li className="nav-item">
                                {loggedIn ? (
                                    <button onClick={logOut} className="nav-link text-white">Log Out</button>
                                ) : (
                                    <a className="nav-link text-white" href="/login">Log In</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {props.children}
            <footer className="text-white mt-5 p-4 text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <h5>Quick links:</h5>
                        </div>
                        <div className="col-sm-4">
                            <h5>Contact:</h5>
                        </div>
                        <div className="col-sm-4">
                            <h5>Social Media:</h5>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default Layout;