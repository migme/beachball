import config from '../config'
const self = typeof window === 'undefined' ? global : window

export default function (endpoint, options = {}) {
  if (endpoint.charAt(0) !== '/') {
    endpoint = `/${endpoint}`
  }

  options.headers = options.headers || {}
  Object.assign(options.headers, {
    authorization: 'Bearer ' + config.access_token
  })

  if (!options.headers.hasOwnProperty('content-type')) {
    Object.assign(options.headers, { 'content-type': 'application/json' })
  }

  return self.fetch(config.baseUrl + endpoint, options)
}
