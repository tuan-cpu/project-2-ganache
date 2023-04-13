import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TransactionProvider } from './context/TransactionContext';
import { ContextProvider } from './context/ContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
  <ContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ContextProvider>
  </TransactionProvider>
)
