import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { DataContextProvider } from './context/DataContext.jsx';
import { ModalContextProvider } from './context/ModalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <DataContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalContextProvider>
      </DataContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
