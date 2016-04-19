import urltemplate from 'url-template'
import { on, off } from 'bubbly'
import config from '../config'

const uiMethods = {
  share (url) {
    const dialog = openWindow(url)
    return awaitMessage(dialog)
  }
}

function openWindow (url) {
  return window.open(url)
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

// UI
export default async function (method = 'share', ...args) {
  const delegate = uiMethods[method]
  return delegate(...args).then(res => {
    return res
  })
}
