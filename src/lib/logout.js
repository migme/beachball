import localstorage from 'universal-localstorage'
import config from '../config'

// Logout
export default async function () {
  return localstorage.removeItem(config.storage_key)
}
