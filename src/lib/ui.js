import config from '../config'
import urltemplate from 'url-template'
import { awaitMessage } from '../utils/async'

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
  const SHARE_POST_TO_MIGME_URL = `{+host}/share_to_migme{?${[
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

function getRandCode (len = 15) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < len - 1; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

export const renderShareButton = function () {
  const shareButtonClassName = 'migme-share-button'
  if (document) {
    var containers = document.getElementsByClassName(shareButtonClassName)

    if (containers && containers.length && containers.length > 0) {
      for (let i = 0; i < containers.length; i++) {
        var container = containers[i]
        var containerWidth = container.clientWidth
        var iframeName = getRandCode(15)
        var client_id = config.client_id || ''
        var href = container.getAttribute('data-href') || ''
        var layout = container.getAttribute('data-layout') || 'button'

        var spanStyle = ''
        switch (layout) {
          case 'button':
            spanStyle = 'vertical-align: bottom; width: 58px; height: 20px;'
            break
          default:
            spanStyle = 'vertical-align: bottom; width: 58px; height: 20px;'
        }

        containers[i].innerHTML = `<span style="${spanStyle}"><iframe name="${iframeName}" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="migme:share_button Migme Social Plugin" src="https://connect.mig.me/plugins/share_button?client_id=${client_id}&amp;container_width=${containerWidth}&amp;href=${href}&amp;layout=${layout}" style="border: none; visibility: visible; width: 58px; height: 20px;" class=""></iframe></span>`
      }
    }
  }
}

// UI
export default uiMethods
