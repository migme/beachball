import Session from './lib/Session'
import API from './lib/API'
import {version} from '../package.json'

export default class Migme {
  constructor (opts) {
    Object.assign(this, {
      client_id = '',
      redirect_uri = '',
      version = version,
      access_token = ''
    }, opts)

    this.Session = new Session(this)
    this.API = new API(this)
  }
}

export default Migme
