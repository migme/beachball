import localstorage from 'universal-localstorage'
import config from '../config'

// Save Session
export default async function (data) {
  if (data) {
    config.access_token = data.access_token
    return localstorage.setItem(config.storage_key, JSON.stringify(data))
  }
  return null
}
