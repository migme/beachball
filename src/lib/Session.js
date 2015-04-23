import {URI} from 'uri-template-lite'
import localforage from 'localforage'

const API_URL_LOGIN = `{baseUrl}/login-page/{?${[
  'callback',
  'callback_type',
  'redirect_uri',
  'scopes',
  'redirect_uri',
  'client_id'
]}}`

function loginIframe () {
  const data = Object.assign({
    callback_type: 'iframe'
  }, this.migme)
  const url = URI.expand(API_URL_LOGIN, data)
  const iframe = document.createElement('iframe')
  iframe.src = url
  document.body.appendChild(iframe)
  return awaitMessage()
}

function loginRedirect () {
  const data = Object.assign({
    callback_type: 'redirect',
    redirect_uri: window.location.href
  }, this.migme)
  const url = URI.expand(API_URL_LOGIN, data)
  this._redirect(url)
  return new Promise(() => {})
}

function loginPopup () {
  const data = Object.assign({
    callback_type: 'popup'
  }, this.migme)
  const url = URI.expand(API_URL_LOGIN, data)
  window.open(url)
  return awaitMessage.call(this)
}

function awaitMessage () {
  return new Promise((resolve, reject) => {
    window.addEventListener('message', event => {
      if (this && this.migme && event.origin === this.migme.baseUrl) {
        if (event.data.err) reject(event.data.err)
        else if (event.data.res) resolve(event.data.res)
      }
    }, false)
  })
}

function getLoginFromHash () {
  return new Promise(resolve => {
    const data = JSON.parse(window.location.hash.substring(1))
    resolve(data.res)
  })
}

function saveProfile (data) {
  return localforage.setItem('session', data)
}

function trimHash () {
  const location = window.location
  const length = location.href.length - location.hash.length
  const trimmed = location.href.substring(0, length)
  location.replaceState(null, null, trimmed)
}

export default class Session {
  constructor (migme) {
    this.migme = migme

    getLoginFromHash()
      .then(saveProfile)
      .then(trimHash)
      .catch(function () {
      })
  }

  getStatus () {
    return localforage.getItem('session')
  }

  _redirect (href) {
    window.location.href = href
  }

  login (type = 'popup') {
    let session
    switch (type) {
      case 'iframe':
        session = loginIframe.apply(this)
        break
      case 'redirect':
        session = loginRedirect.call(this)
        break
      case 'popup':
      default:
        session = loginPopup.apply(this)
    }
    return session
      .then(saveProfile)
  }

  signin () {
    return this.login.apply(this, arguments)
  }

  logout () {
    return localforage.removeItem('session')
  }

  signout () {
    return this.logout.apply(this, arguments)
  }
}
