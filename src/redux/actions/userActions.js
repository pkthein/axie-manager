// import axios from 'axios'

// import { listNotes } from './notesActions'

export const setEmail = email => ({ // 1 param = no parentheses
  type: 'SET_EMAIL',
  email,
  // email: email,
})

export const setIsLoggedIn = isLoggedIn => ({
  type: 'SET_IS_LOGGED_IN',
  isLoggedIn,
})

export const setUsername = username => ({
  type: 'SET_USERNAME',
  username,
})

export const mockLogin = (username, password) => (dispatch, getState) => {
  if (username === 'admin' && password === 'axie-manager-admin') {
    return dispatch(setIsLoggedIn(true))
  } else {
    return dispatch(setIsLoggedIn(false))
  }
}

// export const registerUser = user => (dispatch, getState) => {
//   axios.post(`/api/auth/user/signup`, user, { withCredentials: true })
//     .then(res => {
//       console.log(res)
//       dispatch(setIsLoggedIn(true))
//     })
//     .catch(res => {
//       console.log(res)
//     })
// }

// export const loginUser = user => (dispatch, getState) => {
//   let cookiePW = user.user.password
  
//   axios.post(`/api/auth/user/login`, user, { withCredentials: true })
//     .then(res => {
//       document.cookie = `email=${res.data.response.user.email}`
//       document.cookie = `password=${cookiePW}`

//       dispatch(setUsername(res.data.response.user.username))
//       dispatch(setIsLoggedIn(true))
//       return
//     })
//     .then(() => dispatch(listNotes()))
//     .catch(res => {
//       console.log(res)
//     })
// }

// export const logoutUser = () => (dispatch, getState) => {
//   axios.post(`api/auth/user/logout`, {}, { withCredentials: true })
//     .then(res => {
//       dispatch(setEmail(''))
//       dispatch(setUsername(''))
//       dispatch(setIsLoggedIn(false))
//     })
//     .catch(res => {
//       console.log(res)
//     })
// }
