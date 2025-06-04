import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa tu componente principal
import './styles/global.css'; // Importamos los estilos globales de la aplicación

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);