import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { AdminAuthContextProvider } from './context/AdminAuthContext'; // Import AdminAuthContextProvider
import { EventsContextProvider } from './context/AdminEventContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminAuthContextProvider> {/* Wrap AuthContextProvider with AdminAuthContextProvider */}
        <EventsContextProvider>
          <App />
        </EventsContextProvider>
      </AdminAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
