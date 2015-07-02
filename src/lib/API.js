export default class API {
  constructor (migme) {
    this.migme = migme
  }

  async url (endpoint, options = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint
    }
    const session = await this.migme.Session.getStatus()
    return window.fetch(this.migme.baseUrl + endpoint, {
      headers: new Headers({
        'content-type': 'application/json',
        authorization: 'Bearer ' + session.access_token
      })
    })
  }
}
