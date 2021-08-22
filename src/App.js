import React from 'react'
import './App.css'

import { useLocation } from "react-router-dom"

import {
  Switch,
  Route,
  // Link,
  Redirect,
} from "react-router-dom"
import { useSelector } from 'react-redux'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
// import Signup from './pages/Signup'

const App = ({}) => {
  const { search } = useLocation()

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  const dashboardPath = search ? `dashboard${search}` : 'dashboard'

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to={dashboardPath} />
      )}

      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 100,
          backgroundColor: 'white',
          padding: '12px 16px',
          boxShadow: '0 2px 2px -2px gray',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            lineHeight: '1.2',
            // marginBottom: '.5rem',
          }}
        >
          <div style={{ fontSize: 'calc(1.325rem + .9vw)', fontWeight: 500 }}>
            Axie Manager
          </div>
          <sub style={{ bottom: '0' }}>v-0.0.3</sub>
        </div>
      </div>

      <Switch>
        {/* <Route path="/signup" component={ Signup } /> */}
        <Route path="/login" component={ Login } />
        <Route path="/dashboard?" component={ Dashboard } />
        <Route path="/" component={ Dashboard } />

        {/* TODO: add 404 page */}
      </Switch>
    </div>
  )
}

export default App
