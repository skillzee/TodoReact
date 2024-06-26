import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import {createContext} from "react"
import { useState } from 'react'

export const server = "https://todo-3mmu.onrender.com"

export const Context = createContext({isAuthenticated: false})


const AppWrapper = ()=>{

  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  return(
    <Context.Provider value={{
      isAuthenticated,
      setisAuthenticated,
      loading,
      setLoading,
      user,
      setUser
    }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
