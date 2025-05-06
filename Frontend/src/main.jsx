// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css";

// Se obtiene el elemento raíz definido en el index.html y se renderiza la aplicación.
// React.StrictMode es opcional, ayuda a detectar problemas potenciales.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
