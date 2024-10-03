import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContext } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Set up axios with credentials
import axios from 'axios';
axios.defaults.withCredentials = true;

// Initialize React Query client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        {/* Simply render App without RouterProvider here */}
        <App />
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);

// Optional: Web vitals logging
reportWebVitals();
