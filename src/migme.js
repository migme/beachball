import Session from './lib/Session'
import API from './lib/API'

export default class Migme {

    this.Session = new Session(this)
    this.API = new API(this)
  }
}

export default Migme
