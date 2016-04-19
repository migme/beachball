import config from '../config'
import {awaitMessage} from '../utils/async'

const uiMethods = async({ method, href } = {}) => {
  switch (method) {
    case 'share':
      if (typeof href === 'string') {
        // we didn't do any validation but left it for sharing page to validate it.
        const dialog = openWindow(encodeURIComponent(href))
        return awaitMessage(dialog)
      } else {
        throw Error(`href: ${href} is not valid.`)
      }
      break
    default:
      throw Error(`method: ${method} is not valid`)
  }
}

function openWindow (href) {
  const pathForShareToMigme = '/share_to_mig33?referrer=&campaign=&return_url=&href='
  const url = `${config.host}${pathForShareToMigme}${href}`
  return window.open(url, '', 'height=250px, width=500px')
}

// UI
export default uiMethods
