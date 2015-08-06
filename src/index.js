/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-fetch'
/* eslint-enable no-unused-vars */
import login from './lib/login'
import logout from './lib/logout'
import getLoginStatus from './lib/login-status'
import getLoginFromHash from './lib/login-from-hash'
import saveSession from './lib/save-session'
import api from './lib/API'
import {trimHash} from './utils/hash'
import config from './config'

const Beachball = {
  init ({
    client_id = '',
    redirect_uri = '',
    version = '',
    access_token = '',
    baseUrl = 'https://api.mig.me',
    storage_key = 'migme-session'
  } = {}) {
    Object.assign(config, {
      client_id,
      redirect_uri,
      version,
      access_token,
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
  getLoginStatus
}

export default Beachball
