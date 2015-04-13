export default class API {
  constructor (migme) {
    this.migme = migme
  }

  url (endpoint, options = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint
    }

    options['Content-Type'] = 'application/json'
    options.Authorization = 'Bearer ' + this.access_token

    return window.fetch(this.migme.baseUrl + endpoint, options)
  }
}
