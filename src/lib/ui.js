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
  const w = 500
  const h = 500
  const pathForShareToMigme = '/share_to_migme?referrer=&campaign=&return_url=&href='
  const url = `${config.host}${pathForShareToMigme}${href}`

  const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = ((width / 2) - (w / 2)) + dualScreenLeft;
  var top = ((height / 2) - (h / 2)) + dualScreenTop;

  return window.open(url, 'migme', `height=${h}, width=${w}, top=${top}, left=${left}`)
}

// UI
export default uiMethods
