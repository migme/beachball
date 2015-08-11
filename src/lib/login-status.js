import localstorage from 'universal-localstorage'
import config from '../config'

// Get Login Status
export default async function () {
  const session = localstorage.getItem(config.storage_key)
  return JSON.parse(session)
}
