import { dispatch, on, off } from 'bubbly'
import EventTarget from 'event-target-shim'
import urltemplate from 'url-template'
import localforage from 'localforage'
import isEqual from 'lodash.isequal'
import dom4 from 'dom4' // eslint-disable-line no-unused-vars

const API_URL_LOGIN = `{+baseUrl}/login-page/{?${[
  'callback',
  'callback_type',
  'client_id',
  'redirect_uri',
  'scope'
]}}`

function sneak (cb) {
  return function () {
    cb.apply(this, arguments)
    return arguments[0]
  }
}

const loginMethods = {}

loginMethods.iframe = function ({ parent = document.body } = {}) {
  const data = Object.assign({
    callback_type: 'iframe'
  }, this.migme)
  const url = urltemplate.parse(API_URL_LOGIN).expand(data)
  const iframe = document.createElement('iframe')
  iframe.src = url
  parent.appendChild(iframe)
  return this::awaitMessage(iframe.contentWindow)
    .then(sneak(::iframe.remove))
}

loginMethods.redirect = function () {
  const data = Object.assign({
    callback_type: 'redirect',
    redirect_uri: window.location.href
  }, this.migme)
  const url = urltemplate.parse(API_URL_LOGIN).expand(data)
  this._redirect(url)
  return new Promise(() => {})
}

loginMethods.popup = function () {
  const data = Object.assign({
    callback_type: 'popup'
  }, this.migme)
  const url = urltemplate.parse(API_URL_LOGIN).expand(data)
  const dialog = this._windowOpen(url)
  return this::awaitMessage(dialog)
}

function awaitMessage (sourceWindow) {
  return new Promise((resolve, reject) => {
    const onMessage = event => {
      if (event.source === sourceWindow) {
        if (event.data.err) reject(event.data.err)
        else if (event.data.res) resolve(event.data.res)
        else return
        window::off('message', onMessage)
      }
    }
    window::on('message', onMessage)
  })
}

async function getLoginFromStorage () {
  return await localforage.getItem('session')
}

function getLoginFromHash () {
  return new Promise(resolve => {
    const data = JSON.parse(window.location.hash.substring(1))
    resolve(data.res)
  })
}

async function saveProfile (data) {
  const session = await localforage.getItem('session')
  await localforage.setItem('session', data)
  if (!isEqual(session, data)) {
    this::dispatch('change', data)
  }
}

function trimHash () {
  const location = window.location
  const length = location.href.length - location.hash.length
  const trimmed = location.href.substring(0, length)
  location.replaceState(null, null, trimmed)
}

export default class Session extends EventTarget {
  constructor (migme) {
    super(migme)
    this.migme = migme

    getLoginFromStorage()
      .then(this::saveProfile)

    getLoginFromHash()
      .then(this::saveProfile)
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

  _windowOpen (url) {
    return window.open(url)
  }

  login (type = 'popup', ...args) {
    const delegate = loginMethods[type]
    return delegate.apply(this, args)
      .then(this::saveProfile)
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
