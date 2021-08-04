import React from 'react'
import './App.css'

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
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to="/dashboard" />
      )}

      <br />
      <h2>Axie Manager v-0.0.1</h2>

      <Switch>
        {/* <Route path="/signup" component={ Signup } /> */}
        <Route path="/login" component={ Login } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/" component={ Dashboard } />

        {/* TODO: add 404 page */}
      </Switch>
    </div>
  )
}

export default App
