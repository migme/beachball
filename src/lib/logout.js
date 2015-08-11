import localstorage from 'universal-localstorage'
import config from '../config'

// Logout
export default async function () {
  config.access_token = ''
  return localstorage.removeItem(config.storage_key)
}
