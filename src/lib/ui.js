import config from '../config'
import urltemplate from 'url-template'
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
  const SHARE_POST_TO_MIGME_URL = `{host}/share_to_migme{?${[
    'href'
  ]}}`
  const data = {
    href,
    host: config.host
  }

  const w = 500
  const h = 500

  const url = urltemplate.parse(SHARE_POST_TO_MIGME_URL).expand(data)

  const screen = screen || {screen: {left: 0, right: 0}}
  const dualScreenLeft = window.screenLeft || screen.left
  const dualScreenTop = window.screenTop || screen.top

  const width = window.innerWidth || document.documentElement.clientWidth || screen.width
  const height = window.innerHeight || document.documentElement.clientHeight || screen.height

  var left = ((width / 2) - (w / 2)) + dualScreenLeft
  var top = ((height / 2) - (h / 2)) + dualScreenTop

  return window.open(url, 'migme', `height=${h}, width=${w}, top=${top}, left=${left}`)
}

// UI
export default uiMethods
