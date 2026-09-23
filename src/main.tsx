import './style.css';
import Experience from './Experience/Experience';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './Components/MainPage';

const experience = Experience.getInstance();
experience.initialize();

// Create a React root element if it doesn't exist
const reactRootId = 'react-root';
let reactRoot = document.getElementById(reactRootId);
if (!reactRoot) {
  reactRoot = document.createElement('div');
  reactRoot.id = reactRootId;
  document.body.appendChild(reactRoot);
}

ReactDOM.createRoot(reactRoot).render(<MainPage />);
