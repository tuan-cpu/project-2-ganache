import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TransactionProvider } from './controller/TransactionProvider';
import { ContextProvider } from './controller/ContextProvider';
import { DataProvider } from './controller/DataProvider';
import { AuthProvider } from './controller/AuthProvider';

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
