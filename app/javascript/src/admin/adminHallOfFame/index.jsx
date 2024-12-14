import React from "react";
import ReactDOM from 'react-dom';
import './admin_hall_of_fame.scss';
import Layout from "../../layout";
import AdminHallOfFame from "./adminHallOfFame";
import AddDogOfTheMonth from "./addDogOfTheMonth";

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Layout>
            <div className="container">
                <h2 className="mt-5 mb-3 text-center">Admin Hall of Fame</h2>
                <AddDogOfTheMonth />
                <AdminHallOfFame />
            </div>
        </Layout>,
        document.body.appendChild(document.createElement('div')),
    )
})