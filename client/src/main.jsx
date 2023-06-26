import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from "./store/reduxStore.js"
import "./config/firebase-config.js"
import ErrorBoundary from './components/error/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>

    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
