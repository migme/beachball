/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
/* eslint-enable no-unused-vars */
import login from './lib/login'
import logout from './lib/logout'
import getLoginStatus from './lib/login-status'
import getLoginFromHash from './lib/login-from-hash'
import saveSession from './lib/save-session'
import setScope from './lib/scope'
import api from './lib/API'
import {trim as trimHash} from './utils/hash'
import config from './config'
import ui from './lib/ui'

const Beachball = {
  init ({
    client_id = '',
    redirect_uri = '',
    version = '',
    access_token = '',
    scope = '',
    baseUrl = 'https://api.mig.me',
    storage_key = 'migme-session'
  } = {}) {
    Object.assign(config, {
      client_id,
      redirect_uri,
      version,
      access_token,
      scope,
      baseUrl,
      storage_key
    })

    getLoginStatus().then(saveSession)
    getLoginFromHash()
      .then(saveSession)
      .then(trimHash)
      .catch(() => {})
  },

  api,
  login,
  logout,
  getLoginStatus,
  setScope,
  ui
}

export default Beachball

// export Beachball as MIGME 
//
// try {
//   window.MIGME || (function(window, migme_fif_window) {
//     // 
//   })(window.inDapIF ? parent.window : window, window);
// } catch (e) {
//
// }