const API_BASE = Symbol()
const OAUTH_BASE = Symbol()
const LOGIN = Symbol()

class Login {
  constructor (o, api, oauth) {
    this.client_id = o.client_id
    this.redirect_uri = o.redirect_uri
    this.API_BASE = api
    this.OAUTH_BASE = oauth
  }

  buildLoginUrl (scopes) {
    return 'https://login.mig.me/' +
            '?client_id=' + this.client_id +
            (this.redirect_uri ? '&redirect_uri=' + this.redirect_uri : '') +
            '&scope=' + scopes +
            '&response_type=code'
  }

  popup (scopes) {
    let opener
    let loc = this.buildLoginUrl(scopes)
    // This is a test
    return new Promise((resolve, reject) => {
      let recieveMessage = (e) => {
        if (typeof opener !== 'undefined') {
          opener.close()
          opener = null
        }

        if (e.origin === this.OAUTH_BASE) {
          resolve(e.data)
        } else {
          reject(e.data)
        }
      }

      window.open(loc)

      window.addEventListener('message', recieveMessage, false)
    })
  }

  redirect (scopes) {
    let loc = this.buildLoginUrl(scopes)

    window.location = loc
  }
}

export default class Migme {
  constructor (options = {}) {
    this.client_id = options.client_id || null
    this.redirect_uri = options.redirect_uri || null
    this.version = options.version || '1.0'
    this.access_token = options.access_token || null

    this[API_BASE] = 'https://migme-sandcastle.herokuapp.com'
    this[OAUTH_BASE] = 'https://oauth.mig.me/oauth'
    this[LOGIN] = new Login(this, this[API_BASE], this[OAUTH_BASE])
  }

  /**
   * @brief Returns the migme login status of a user.
   * @details Returns the migme login status of a user, with an authResponse object if they are logged in.
   * @return authResponse object
   */
  getLoginStatus () {
    return window.fetch(this[OAUTH_BASE] + '/loginstatus')
  }

  /**
   * @brief Prompts a user to login to your app.
   * @details Prompts a user to login to your app using the Login dialog in a popup. This method can also be used with an already logged-in user to request additional permissions from them.
   * @return authResponse object
   */
  login (scopes = [], type = 'popup') {
    switch (type) {
      case 'popup':
        this[LOGIN].popup(scopes)
        break
      case 'redirect':
        this[LOGIN].redirect(scopes)
        break
    }
  }

  signin (scopes = [], type = 'popup') {
    this.login(scopes, type)
  }

  // TODO: do a proper logout
  logout () {
    return window.fetch(this[OAUTH_BASE] + '/logout')
  }

  api (endpoint, options = {}) {
    if (endpoint.charAt(0) !== '/') {
      endpoint = '/' + endpoint
    }

    options['Content-Type'] = 'application/json'
    options.Authorization = 'Bearer ' + this.access_token

    return window.fetch(this[API_BASE] + endpoint, options)
  }
}
