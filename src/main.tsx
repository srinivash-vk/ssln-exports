/**
 * Application Entry Point
 * 
 * Bootstraps the React application by rendering the root App component
 * into the DOM structure defined in index.html. Includes StrictMode for
 * highlighting potential problems in the application during development.
 */
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
