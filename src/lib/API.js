const API_BASE = 'https://migme-sandcastle.herokuapp.com'

export default class API {
  constructor (migme) {}

  url (endpoint, options = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint
    }

    options['Content-Type'] = 'application/json'
    options.Authorization = 'Bearer ' + this.access_token

    return window.fetch(API_BASE + endpoint, options)
  }
}
