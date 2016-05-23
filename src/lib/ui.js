import config from '../config'
import urltemplate from 'url-template'
import { awaitMessage } from '../utils/async'
import { getRandCode } from '../utils/rand'
import { emptyInnerHTML } from '../utils/dom'

const uiMethods = async({ method, href } = {}) => {
  switch (method) {
    case 'share':
      if (typeof href === 'string') {
        // we didn't do any validation but left it for sharing page to validate it.
        const dialog = openWindow(encodeURIComponent(href))
        return awaitMessage(dialog)
      }
      throw Error(`href: ${href} is not valid.`)

    default:
      throw Error(`method: ${method} is not valid`)
  }
}

const openWindow = (href = '') => {
  const SHARE_POST_TO_MIGME_URL = `{+hostUrl}/share_to_migme{?${[
    'href'
  ]}}`
  const data = {
    href,
    hostUrl: config.hostUrl,
  }

  const w = 500
  const h = 500

  const url = urltemplate.parse(SHARE_POST_TO_MIGME_URL).expand(data)

  const screen = screen || {screen: {left: 0, right: 0}}
  const dualScreenLeft = window.screenLeft || screen.left
  const dualScreenTop = window.screenTop || screen.top

  const width = window.innerWidth || document.documentElement.clientWidth || screen.width
  const height = window.innerHeight || document.documentElement.clientHeight || screen.height

  const left = ((width / 2) - (w / 2)) + dualScreenLeft
  const top = ((height / 2) - (h / 2)) + dualScreenTop

  return window.open(url, 'migme', `height=${h}, width=${w}, top=${top}, left=${left}, resizable=0`)
}

const getShareButtonSpanStyle = (layout) => {
  switch (layout) {
    case 'button':
      return 'vertical-align: bottom; width: 58px; height: 20px;'
    case 'button_count':
    default:
      return 'vertical-align: bottom; width: 58px; height: 20px;'
  }
}

const getShareButtonIframeStyle = (layout) => {
  switch (layout) {
    case 'button':
      return 'border: none; visibility: visible; width: 58px; height: 20px;'
    case 'button_count':
    default:
      return 'border: none; visibility: visible; width: 58px; height: 20px;'
  }
}

export const renderShareButtons = () => {
  const shareButtonClassName = 'migme-share-button'
  if (document) {
    const clientId = config.client_id || ''
    const containers = document.getElementsByClassName(shareButtonClassName)

    if (containers && containers.length && containers.length > 0) {
      Array.from(containers).forEach(container => {
        container = emptyInnerHTML(container)

        const iframeName = getRandCode(15)
        const containerWidth = container.clientWidth
        const dataHref = container.getAttribute('data-href') || ''
        const dataLayout = container.getAttribute('data-layout') || 'button'

        const spanEle = document.createElement('span')
        spanEle.setAttribute('style', getShareButtonSpanStyle(dataLayout))

        const iframeEle = document.createElement('iframe')
        iframeEle.setAttribute('name', iframeName)
        iframeEle.setAttribute('width', '1000px')
        iframeEle.setAttribute('height', '1000px')
        iframeEle.setAttribute('frameborder', 0)
        iframeEle.setAttribute('allowtransparency', true)
        iframeEle.setAttribute('allowfullscreen', true)
        iframeEle.setAttribute('scrolling', 'no')
        iframeEle.setAttribute('title', 'migme:share_button Migme Social Plugin')

        const SHARE_BUTTON_URL = `{+sdkHostUrl}/plugins/share_button{?${[
          'client_id',
          'container_width',
          'href',
          'layout'
        ]}}`

        const data = {
          sdkHostUrl: config.sdkHostUrl,
          client_id: clientId,
          container_width: containerWidth,
          href: dataHref,
          layout: dataLayout
        }

        const iframeSrc = urltemplate.parse(SHARE_BUTTON_URL).expand(data)
        iframeEle.setAttribute('src', iframeSrc)

        iframeEle.setAttribute('style', getShareButtonIframeStyle(dataLayout))
        iframeEle.setAttribute('class', '')

        spanEle.appendChild(iframeEle)
        container.appendChild(spanEle)
      })
    }
  }
}

// UI
export default uiMethods
