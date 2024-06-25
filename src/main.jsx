import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers/routers.jsx'
import Store from './Store/index.js'
import {Provider} from "react-redux"
import App from './App.jsx'
 
const storage = JSON.parse(localStorage.getItem("favorite"))
    if (!storage) {
      localStorage.setItem("favorite", JSON.stringify([]))
    }
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    {/* <RouterProvider router={router}/> */}
    <App/>
    </Provider>
  </React.StrictMode>,
)
