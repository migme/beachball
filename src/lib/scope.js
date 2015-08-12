import config from '../config'

export default function (scope = '') {
  if (typeof scope === 'string') {
    config.scope = scope
    return config.scope
  }
  throw new Error('Scope must be a string')
}
