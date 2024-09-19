import React from "react";

const Layout = (props) => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand text-primary" href="/">Title</a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Member Spotlight</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Hall of Fame</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Events</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Merch</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link text-primary" href="/login">Log In</a>
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