import validator from 'validator'
import urltemplate from 'url-template'
import { on, off } from 'bubbly'
import config from '../config'

const pathForShareToMigme = '/share_to_mig33?referrer=&campaign=&return_url=&href='

const uiMethods = ({ method, href } = {}) => {
  switch (method) {
    case 'share':
      if (typeof href === 'string') {
        // we didn't do any validation but left it for sharing page
        const dialog = openWindow(encodeURIComponent(href))
        return awaitMessage(dialog)
      } else {
        console.log('TODO: ERROR HREF')
      }
      break
    default:
      console.log('TODO: ERROR')
  }
}

function openWindow (href) {
  const url = `${config.host}${pathForShareToMigme}${href}`
  return window.open(url, '', 'height=250px, width=500px')
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
export default async function (args) {
  const delegate = uiMethods(args)

  // TODO: return error for promise
  return delegate(...args).then(res => {
    return res
  })
}
