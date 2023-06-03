import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TransactionProvider } from './context/TransactionContext';
import { ContextProvider } from './context/ContextProvider';
import { DataProvider } from './context/DataProvider';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <TransactionProvider>
    <ContextProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ContextProvider>
  </TransactionProvider>
  </AuthProvider>
)
