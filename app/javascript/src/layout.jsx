import React, {useEffect, useState} from "react";
import './layout.scss';

const Layout = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);
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
                                <a className="nav-link text-white" href="/">Member Spotlight</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Hall of Fame</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/">Merch</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
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
        </React.Fragment>
    );
}

export default Layout;