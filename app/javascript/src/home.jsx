import React from "react";
import ReactDOM from 'react-dom';
import Layout from './layout';
import Announcements from "./announcements/announcements";
import './home.scss';

const Home = () => (
    <Layout>
        <div className="container">
          <div className="text-center">
            <h1 className="mt-5 mb-3">Lake Ontario Hunting Retriever Club</h1>
            <h3>Subtitle</h3>
            <Announcements />
          </div>
        </div>
    </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Home />,
      document.body.appendChild(document.createElement('div')),
    )
  })