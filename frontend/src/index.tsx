// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client'; // Certifique-se de que este está correto
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa os estilos do Bootstrap
import './styles/App.css'; // Se você tiver um arquivo CSS global

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
