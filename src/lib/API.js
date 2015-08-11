import config from '../config'
const self = typeof window === 'undefined' ? global : window

export default function (endpoint, options = {}) {
  if (endpoint.charAt(0) !== '/') {
    endpoint = `/${endpoint}`
  }

  Object.assign(options, {
    headers: {
      'content-type': 'application/json',
      authorization: 'Bearer ' + config.access_token
    }
  })

  return self.fetch(config.baseUrl + endpoint, options)
}
