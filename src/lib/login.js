import urltemplate from 'url-template'
import { on, off } from 'bubbly'
import config from '../config'
import saveSession from './save-session'

const API_URL_LOGIN = `{+baseUrl}/login-page/{?${[
  'callback',
  'callback_type',
  'client_id',
  'redirect_uri',
  'scope'
]}}`

const loginMethods = {
  popup () {
    const data = Object.assign({
      callback_type: 'popup'
    }, config)
    const url = urltemplate.parse(API_URL_LOGIN).expand(data)
    const dialog = openWindow(url)
    return awaitMessage(dialog)
  },

  redirect () {
    const data = Object.assign({
      callback_type: 'redirect'
    }, config)
    const url = urltemplate.parse(API_URL_LOGIN).expand(data)
    _redirect(url)
  }
}

function openWindow (url) {
  return window.open(url)
}

function _redirect (href) {
  window.location.href = href
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

// Login
export default async function (type = 'popup', ...args) {
  const delegate = loginMethods[type]
  return delegate(...args).then(res => {
    saveSession(res)
    return res
  })
}
