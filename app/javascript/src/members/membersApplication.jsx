import React from "react";
import { handleErrors } from "../utils/fetchHelper";

class MembersApplication extends React.Component {
    state = {
        loading: true,
        error: '',
    };

    render () {
        const { loading, error } = this.state;

        return (
            <div className="container text-center">
                <h2 className="mt-5">Member Application</h2>
                <h4 className="mt-3 mb-3">To become a member, print and complete the application below</h4>
                <h4 className="mt-3 mb-3">Or complete the online form <a href="https://docs.google.com/forms/d/e/1FAIpQLScLi3oP_UmNS-IHrUYYTqt0VtTa-LFyZXEf-sziqeAu-audAA/viewform" target="blank">here</a></h4>
                <embed id="application-pdf" src="/members/2025 MEMBERSHIP APP.pdf" type="application/pdf"></embed>
                <h4 className="mt-3 mb-5">To submit your application, email it to lakeontariohrc@outlook.com</h4>
            </div>
        )
    }
}

export default MembersApplication