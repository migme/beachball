// const API_BASE = new Symbol();
// const OAUTH_BASE = new Symbol();
//
class Login {

}

export default class Migme {

  constructor (options = {}) {
    this.client_id = options.client_id || '309f818242abae8fdd1b';
    this.redirect_uri = options.redirect_uri || null;
    this.version = options.version || '1.0';
    this.access_token = options.access_token || null;

    this.API_BASE = 'https://api.mig.me';
    this.OAUTH_BASE = 'https://oauth.mig.me/oauth';
  }

  /**
   * @brief Returns the migme login status of a user.
   * @details Returns the migme login status of a user, with an authResponse object if they are logged in.
   * @return authResponse object
   */
  getLoginStatus () {

  }

  /**
   * @brief Prompts a user to login to your app.
   * @details Prompts a user to login to your app using the Login dialog in a popup. This method can also be used with an already logged-in user to request additional permissions from them.
   * @return authResponse object
   */
  login (scopes = [], type = 'popup') {

    switch (type) {
      case 'popup':
        this.loginWithPopup(scopes);
        break;
      case 'redirect':
        this.loginWithRedirect(scopes);
        break;
    }

  }

  signin (scopes = [], type = 'popup') {
    this.login(scopes, type);
  }

  buildLoginUrl (scopes) {
    return 'https://login.mig.me/' +
            '?client_id=' + this.client_id +
            (this.redirect_uri ? '&redirect_uri=' + this.redirect_uri : '') +
            '&scope=' + scopes +
            '&response_type=code';
  }

  loginWithPopup (scopes) {
    let opener;
    let loc = this.buildLoginUrl(scopes);

    return new Promise((resolve, reject) => {

      let recieveMessage = (e) => {
        if (typeof opener !== 'undefined') {
          opener.close();
          opener = null;
        }

        if (e.origin === this.OAUTH_BASE) {
          resolve(e.data);
        } else {
          reject(e.data);
        }
      };

      window.open(loc);

      window.addEventListener('message', recieveMessage, false);
    });
  }

  loginWithRedirect (scopes) {
    let loc = this.buildLoginUrl(scopes);

    window.location = loc;
  }

  // TODO: do a proper logout
  logout () {
    return fetch(this.OAUTH_BASE + '/logout');
  }

  api (endpoint, options = {}) {
    endpoint = endpoint.indexOf('/') === 0 ? endpoint : '/' + endpoint;

    if (typeof this.access_token !== 'undefined') {
      options['Content-Type'] = 'application/json';
      options.Authorization = 'Bearer ' + this.access_token;

      return fetch(this.API_BASE + endpoint, options);
    } else {
      console.error('You need to get an access_token before calling api()');
    }
  }
}
