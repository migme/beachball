import Session from './lib/Session'
import API from './lib/API'
import {version} from '../package.json'

export default class Migme {
  constructor ({
    client_id = '',
    redirect_uri = '',
    version = version,
    access_token = '',
    baseUrl = 'https://migme-sandcastle.herokuapp.com'
  }) {
    Object.assign(this, {
      client_id,
      redirect_uri,
      version,
      access_token,
      baseUrl
    })

    this.Session = new Session(this)
    this.API = new API(this)
  }
}
