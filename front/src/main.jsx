// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css';

// Ensure dark mode is always on
document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
