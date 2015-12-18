import localstorage from 'universal-localstorage'
import config from '../config'

function getSessionId (sKey) {
  if (!sKey || typeof document === 'undefined') return null
  const cookie = document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' +
   encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
   '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')
  const session_id = decodeURIComponent(cookie)
  return session_id ? { session_id } : null
}

// Get Login Status
export default async function () {
  const session = localstorage.getItem(config.storage_key)
  return JSON.parse(session) || getSessionId('eid')
}
