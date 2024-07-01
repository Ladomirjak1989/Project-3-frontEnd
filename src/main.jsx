import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routers.jsx'
import Store from './Store/index.js'
import { Provider } from "react-redux"
import App from './App.jsx'
import { AuthProviderWrapper } from '../context/auth.context.jsx'

const storage = JSON.parse(localStorage.getItem("favorite"))
if (!storage) {
  localStorage.setItem("favorite", JSON.stringify([]))
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviderWrapper>


      <Provider store={Store}>
        {/* <RouterProvider router={router}/> */}
        <App />
      </Provider>
    </AuthProviderWrapper>
  </React.StrictMode>,
)
