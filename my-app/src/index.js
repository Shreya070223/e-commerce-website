import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <script src="http://localhost:8097"></script>
    <App />
  </React.StrictMode>
);

 
reportWebVitals();
