import React from "react";
import ReactDOM from 'react-dom';
import Layout from './layout';
import Announcements from "./announcements/announcements";
import './home.scss';

const Home = () => (
    <Layout>
      <div className="text-center" id="home-welcome">
          <div id="home-title-text">
            <h1 className="mb-5 text-white text-shadow" id="home-title">Lake Ontario Hunting Retriever Club</h1>
            <h3 className="text-white text-shadow" id="home-subtitle">Subtitle</h3>
          </div>
      </div>
      <Announcements />
    </Layout>
)

document.addEventListener('DOMContentLoaded', () => {
  const userProperties = document.body.getAttribute('data-user-properties') === 'true';

  ReactDOM.render(
    <Home userProperties={userProperties} />,
    document.body.appendChild(document.createElement('div')),
  )
})