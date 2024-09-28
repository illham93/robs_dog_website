import React from "react";
import { createRoot } from "react-dom/client";
import Layout from './layout';
import Announcements from "./announcements/announcements";
import './home.scss';

const Home = () => (
    <Layout>
      <div className="text-center" id="home-welcome">
        <h1 className="mb-5 text-white text-shadow" id="home-title">Lake Ontario Hunting Retriever Club</h1>
        <h3 className="text-white text-shadow" id="home-subtitle">Subtitle</h3>
      </div>
      <Announcements />
    </Layout>
)

const container = document.getElementById('root');
const root = createRoot(container);

root.render (<Home />);