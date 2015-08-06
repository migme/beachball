/* global describe, it */
import {expect} from 'chai'
import Beachball from '../src'
import config from '../src/config'

describe('Beachball', () => {
  it('should expose init', () => {
    expect(Beachball.init).to.exist
    expect(Beachball.init).to.be.a('function')
  })

  it('should init Beachball', () => {
    const client_id = '309f818242abae8fdd1b'
    const access_token = 'TESTING'

    Beachball.init({
      client_id,
      access_token
    })

    expect(config.client_id).to.equal(client_id)
    expect(config.access_token).to.equal(access_token)
    expect(config.baseUrl).to.equal('https://api.mig.me')
  })

  it('should expose login', () => {
    expect(Beachball.login).to.exist
    expect(Beachball.login).to.be.a('function')
  })

  it('should expose API', () => {
    expect(Beachball.api).to.exist
    expect(Beachball.api).to.be.a('function')
  })

  it('should expose getLoginStatus', () => {
    expect(Beachball.getLoginStatus).to.exist
    expect(Beachball.getLoginStatus).to.be.a('function')
  })
})
