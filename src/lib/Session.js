const OAUTH_BASE = 'https://oauth.mig.me/oauth'

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
  // This is a test
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

function redirect (scopes) {
  const loc = buildLoginUrl(scopes)

  window.location = loc
}

class Session {
  constructor (migme) {
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
      case 'popup':
        popup(scopes)
        break
      case 'redirect':
        redirect(scopes)
        break
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
