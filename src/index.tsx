import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import React from 'react';
import Provider from './Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
    
  </React.StrictMode>
);


