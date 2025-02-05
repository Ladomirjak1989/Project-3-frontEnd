import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./App.css"
import { RouterProvider } from 'react-router-dom'
import router from './routers/routers.jsx'
import Store from './Store/index.js'
import { Provider } from "react-redux"
import App from './App.jsx'
// import { AuthProviderWrapper } from '../context/auth.context.jsx'
import './i18n'; // Import the i18n configuration

const cartStorage = JSON.parse(localStorage.getItem("cart"))
if (!cartStorage) {
  localStorage.setItem("cart", JSON.stringify([]))
}

const storage = JSON.parse(localStorage.getItem("favorite"))
if (!storage) {
  localStorage.setItem("favorite", JSON.stringify([]))
}
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <AuthProviderWrapper>


      <Provider store={Store}>
        {/* <RouterProvider router={router}/> */}
        <App />
      </Provider>
    // </AuthProviderWrapper>
  // </React.StrictMode>,
)
