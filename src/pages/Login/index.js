import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { mockLogin } from '../../redux/actions/userActions'

const Login = ({}) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    dispatch(mockLogin(username, password))
  }

  return (
    <div>
      <br />
      <h4>Login</h4>
      <br />

      <form onSubmit={handleOnSubmit}>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required={true}
        />
        <br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required={true}
        />
        <br />

        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login
