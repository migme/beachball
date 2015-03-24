const API_BASE = 'https://api.mig.me';
const OAUTH_BASE = 'https://oauth.mig.me/oauth';

export default class Migme {

  constructor (options = {}) {
    this.client_id = options.client_id || '309f818242abae8fdd1b';
    this.redirect_uri = options.redirect_uri || 'http://localhost:8080/oauth/callback';
    this.version = options.version || '1.0';
  }

  /**
   * @brief Returns the migme login status of a user.
   * @details Returns the migme login status of a user, with an authResponse object if they are logged in.
   * @return authResponse object
   */
  getLoginStatus () {

  }

  setAccessToken (access_token) {
    this.access_token = access_token;
  }

  /**
   * @brief Prompts a user to login to your app.
   * @details Prompts a user to login to your app using the Login dialog in a popup. This method can also be used with an already logged-in user to request additional permissions from them.
   * @return authResponse object
   */
  login (scopes = [], options = {}) {

    if (window.domain !== 'mig.me') {

      return new Promise(function (resolve, reject) {
        var opener;

        let recieveMessage = function (e) {
          if (typeof opener !== 'undefined') {
            opener.close();
            opener = null;
          }

          console.log(e);

          if (e.origin !== OAUTH_BASE) {
            reject();
          } else {
            resolve(e.data);
          }
        };

        opener = window.open('https://login.mig.me' +
                            '/?client_id=' + this.client_id +
                            '&redirect_uri=' + this.redirect_uri +
                            '&scope=' + scopes.toString() +
                            '&response_type=code');

        window.addEventListener('message', recieveMessage, false);
      });

    } else {

      // Get the auth_token
      return fetch(OAUTH_BASE + '/token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          grant_type: 'password',
          client_id: this.client_id,
          username: options.username,
          password: options.password,
          scope: 'test-scope'
        })
      });

    }
  }

  // TODO: do a proper logout
  logout () {
    return fetch(OAUTH_BASE + '/logout');
  }

  api (endpoint, options = {}) {
    if (endpoint.indexOf('/') !== 0) {
      endpoint = '/' + endpoint;
    }

    if (typeof this.access_token !== 'undefined') {
      options['Content-Type'] = 'application/json';
      options.Authorization = 'Bearer ' + this.access_token;

      return fetch(API_BASE + endpoint, options);
    } else {
      console.error('You need to get an access_token before calling api()');
    }
  }
}
