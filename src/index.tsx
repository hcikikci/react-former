import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeFormera } from './react-former/config/config';
import formeraConfig from './formera-config';

initializeFormera(formeraConfig);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
