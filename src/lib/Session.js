const OAUTH_BASE = 'https://oauth.mig.me/oauth'

var API_URL = 'https://migme-sandcastle.herokuapp.com';

var API_URL_LOGIN = API_URL + '/login-page/';
var API_URL_LOGIN_IFRAME = API_URL_LOGIN + '?callback_type=iframe';
var API_URL_LOGIN_POPUP = API_URL_LOGIN + '?callback_type=popup';
var API_URL_LOGIN_REDIRECT = API_URL_LOGIN + '?callback_type=redirect' +
    '&redirect_uri=' + encodeURIComponent(location.href).replace('%20', '+');

function buildLoginUrl ({scopes, redirect_uri, client_id}) {
  return 'https://login.mig.me/' +
          '?client_id=' + client_id +
          (redirect_uri ? '&redirect_uri=' + redirect_uri : '') +
          '&scope=' + scopes +
          '&response_type=code'
}

function popup (scopes) {
  let opener
  const loc = buildLoginUrl(scopes)
  return new Promise((resolve, reject) => {
    let recieveMessage = (e) => {
      if (typeof opener !== 'undefined') {
        opener.close()
        opener = null
      }

      if (e.origin === OAUTH_BASE) {
        resolve(e.data)
      } else {
        reject(e.data)
      }
    }

    window.open(loc)

    window.addEventListener('message', recieveMessage, false)
  })
}

function redirect(scopes) {
  const loc = buildLoginUrl(scopes)

  window.location = loc
}

function loginIframe() {
  var iframe = document.createElement('iframe')
  iframe.src = API_URL_LOGIN_IFRAME
  document.body.appendChild(iframe)
  return awaitMessage()
}

function loginRedirect() {
  location.href = API_URL_LOGIN_REDIRECT
  return Promise.resolve()
}

function loginPopup() {
  window.open(API_URL_LOGIN_POPUP)
  return awaitMessage()
}

function awaitMessage() {
  return new Promise((resolve, reject) => {
    window.addEventListener('message', function(event) {
      if (event.origin === API_URL) {
        if (event.data.err) reject(event.data.err)
        else if (event.data.res) resolve(event.data.res)
      }
    }, false)
  })
}

function parseHash() {
  if (location.hash) {
    try {
      var data = JSON.parse(location.hash.substring(1))
    } catch (error) {
    }
    if (data && (data.err || data.res)) {
      log(JSON.stringify(data.err || data.res))
      var length = location.href.length - location.hash.length
      var trimmed = location.href.substring(0, length)
      location.replaceState(null, null, trimmed)
    }
  }
}

class Session {
  constructor (migme) {
    this.migme = migme;
  }

  /**
   * @brief Returns the migme login status of a user.
   * @details Returns the migme login status of a user, with an authResponse object if they are logged in.
   * @return authResponse object
   */
  getLoginStatus () {
    return window.fetch(OAUTH_BASE + '/loginstatus')
  }

  /**
   * @brief Prompts a user to login to your app.
   * @details Prompts a user to login to your app using the Login dialog in a popup. This method can also be used with an already logged-in user to request additional permissions from them.
   * @return authResponse object
   */
  login (scopes = [], type = 'popup') {
    switch (type) {
      case 'iframe':
        return loginIframe.call(this, scopes)
      case 'redirect':
        return loginRedirect.call(this, scopes)
      case 'popup':
      default:
        return loginPopup.call(this, scopes)
    }
  }

  signin () {
    return this.login.apply(this, arguments)
  }

  logout () {
    return window.fetch(OAUTH_BASE + '/logout')
  }

  signout () {
    return this.logout.apply(this, arguments)
  }
}

export default Session
