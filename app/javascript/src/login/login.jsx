import React from "react";
import Layout from "../layout";
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import {safeCredentials, handleErrors} from 'utils/fetchHelper';

import './login.scss';

class Login extends React.Component {
    state = {
        authenticated: false,
        show_login: true,
    }

    componentDidMount() {
        fetch('/api/authenticated')
    }
}