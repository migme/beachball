"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_BASE = "https://api.mig.me";
var OAUTH_BASE = "https://oauth.mig.me/oauth";

var Migme = exports.Migme = (function () {
  function Migme() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Migme);

    this.client_id = options.client_id || "309f818242abae8fdd1b";
    this.redirect_uri = options.redirect_uri || "http://localhost:8080/oauth/callback";
  }

  _createClass(Migme, {
    getLoginStatus: {

      /**
       * @brief Returns the migme login status of a user.
       * @details Returns the migme login status of a user, with an authResponse object if they are logged in.
       * @return authResponse object
       */

      value: function getLoginStatus() {
        return fetch(OAUTH_BASE + "");
      }
    },
    login: {

      /**
       * @brief Prompts a user to login to your app.
       * @details Prompts a user to login to your app using the Login dialog in a popup. This method can also be used with an already logged-in user to request additional permissions from them.
       * @return authResponse object
       */

      value: function login() {
        var scopes = arguments[0] === undefined ? [] : arguments[0];

        if (typeof window !== "undefined") {
          window.open(OAUTH_BASE + "/login?client_id=" + this.client_id + "&redirect_uri=" + this.redirect_uri + "&scope=" + scopes.toString() + "&response_type=code");
        }
      }
    },
    logout: {
      value: function logout() {
        return fetch(OAUTH_BASE + "");
      }
    },
    api: {
      value: function api(endpoint, options) {
        if (endpoint.indexOf("/") !== 0) {
          endpoint = "/" + endpoint;
        }

        if (typeof this.access_token !== "undefined") {
          options["Content-Type"] = "application/json";
          options.Authorization = "Bearer " + this.access_token;
          return fetch(API_BASE + endpoint, options);
        } else {
          console.error("You need to get an auth_token before calling api()");
        }
      }
    }
  });

  return Migme;
})();
//# sourceMappingURL=migme.js.map