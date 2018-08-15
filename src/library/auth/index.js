/**
 Function collection handling auth
 */

import cookies from 'browser-cookies'
import api from '../api'

export default class Auth {
  static _instance = null

  static instance () {
    if (Auth._instance == null) {
      Auth._instance = new Auth()
    }

    return this._instance
  }

  static i = () => Auth.instance()

  constructor () {
    // Check if we already have a token
    const token = this.getToken()
    if (!token) return

    api.setToken(token)

    // Token found, let's validate it
    this.tokenIsValid().then(valid => {
      if (!valid) return cookies.erase('token')
      api.setToken(token)
    })
  }

  userInfos () {
    return api.get('/auth/me')
      .then(reponse => reponse.data)
      .catch(() => ({id: 1, username: 'Kevin Tester', email: 'kevindu69@hotmail.fr'}))
  }

  /**
   * Check the current token against the server
   * @return {boolean}
   */
  tokenIsValid () {
    return this.userInfos().then(infos => {
      return !!infos.id
    })
  }

  /**
   * Return the current token
   * May be an empty String if the user is a visitor
   * @return {String}
   */
  getToken () {
    return cookies.get('token')
  }

  /**
   * Set the token with the given string
   * @param token
   * @param expires Cookie duration
   */
  setToken (token, expires = 0) {
    cookies.set('token', token, {
      expires: expires / (3600 * 24) // days
    })
  }

  signUp (name, email, password, confirmation) {
    if (password !== confirmation) return Promise.reject(new Error('Password and confirmation doesn\'t match'))

    return api.post('/user/create', {
      username: name,
      email: email,
      password: password,
      user_birthday: '1970-01-01'
    }).then(response => {
      if (response.status === 201) {
        return this.signIn(email, password)
      }

      return Promise.reject(new Error(response.data.data))
    })
  }

  signIn (email, password) {
    return api.post('/auth/login', {
      email: email,
      password: password
    }).then(response => {
      if (response.status === 200) {
        this.setToken(response.data.access_token, response.data.expires_in)
        this.onLogin()

        return true
      }

      return false
    })
  }

  onLogin () {
    api.setToken(this.getToken())
    return this.userInfos()
  }

  onLogout () {
    return api.get('/auth/logout', {}).then(() => {
      api.setToken('')
      cookies.erase('token')
      window.location.reload()
    })
  }
}
