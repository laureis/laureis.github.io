import axios from 'axios'
import qs from 'querystring'

import settings from '../settings.json'

class API {
  /**
   * Instanciate the client and register predefined routes if needed
   */
  constructor () {
    // axios.default.baseURL = settings.baseURL
    // axios.defaults.headers.common['auth-token'] = ''

    this.authToken = ''
  }

  setToken (token) {
    // axios.defaults.headers.common['auth-token'] = token
    this.authToken = token
  }

  getDefaults () {
    return {
      baseURL: settings.baseURL,
      headers: {
        'Authorization': 'Bearer ' + this.authToken
      }
    }
  }

  //
  // API request handling

  /**
   * Send the request with the given option
   * Add options that aren't supposed to change between requests.
   * Set-up handlers for response handling
   * @param options
   */
  sendRequest (options) {
    return axios({
      ...this.getDefaults(),
      ...options
    })
  }

  /**
   * Prepare options to send a request
   * @param url String
   * @param data Object (key/value)
   * @param multipart boolean
   * @param method String GET|POST|PUT|DELETE
   * @return Promise
   */
  sendComplex (url, data, multipart, method) {
    return this.sendRequest({
      ...this.getDefaults(),
      url: url,
      method: method,
      data: qs.stringify(data)
    })
  }

  //
  // Base request methods

  /**
   * Send an HTTP get query to the api
   * @param url
   * @return Promise
   */
  get (url) {
    return this.sendRequest({
      url: url,
      method: 'get'
    })
  }

  /**
   * Send an HTTP POST|PUT|DELETE query to the api
   * - For standard post, data must take the form of a simple key/value object
   * - TODO: POST for multipart form
   * @param url
   */
  post (url, data, multipart = false) {
    return this.sendComplex(url, data, multipart, 'post')
  }

  put (url, data, multipart = false) {
    return this.sendComplex(url, data, multipart, 'put')
  }

  delete (url, data, multipart = false) {
    return this.sendComplex(url, data, multipart, 'delete')
  }
}

const api = new API()
export default api
