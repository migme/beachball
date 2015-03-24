const API_BASE = 'https://api.mig.me';
const OAUTH_BASE = 'https://oauth.mig.me/oauth';

export default class Migme {

  constructor (options = {}) {
    this.client_id = options.client_id || '309f818242abae8fdd1b';
    this.redirect_uri = options.redirect_uri || 'http://localhost:8080/oauth/callback';
  }

  /**
   * @brief Returns the migme login status of a user.
   * @details Returns the migme login status of a user, with an authResponse object if they are logged in.
   * @return authResponse object
   */
  getLoginStatus () {
    return fetch(OAUTH_BASE + '');
  }

  setAccessToken (access_token) {
    this.access_token = access_token;
  }

  /**
   * @brief Prompts a user to login to your app.
   * @details Prompts a user to login to your app using the Login dialog in a popup. This method can also be used with an already logged-in user to request additional permissions from them.
   * @return authResponse object
   */
  login (scopes = []) {

    if (typeof window !== 'undefined') {
      window.open(OAUTH_BASE +
                  '/login?client_id=' + this.client_id +
                  '&redirect_uri=' + this.redirect_uri +
                  '&scope=' + scopes.toString() +
                  '&response_type=code');
    }

  }

  logout () {
    return fetch(OAUTH_BASE + '');
  }

  api (endpoint, options = {}) {
    if (endpoint.indexOf('/') !== 0) {
      endpoint = '/' + endpoint;
    }

    if (typeof this.access_token !== 'undefined') {
      options['Content-Type'] = 'application/json';
      options.Authorization = 'Bearer ' + this.access_token;
      console.log(API_BASE + endpoint, options);
      return fetch(API_BASE + endpoint, options);
    } else {
      console.error('You need to get an access_token before calling api()');
    }
  }
}
