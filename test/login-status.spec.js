/* global describe, it, before, after */
import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'
import localstorage from 'universal-localstorage'
import Beachball from '../src'
import config from '../src/config'

chai.use(chaiAsPromised)

const access_token = '1234567890'

describe('Login Status', () => {
  before(() => {
    localstorage.removeItem(config.storage_key)
  })

  it('should be a function', () => {
    expect(Beachball.getLoginStatus).to.be.a('function')
  })

  it('should return a promise', done => {
    expect(Beachball.getLoginStatus()).to.eventually.equal(null).notify(done)
  })

  it('should return a the session', done => {
    localstorage.setItem(config.storage_key, JSON.stringify({access_token}))
    expect(Beachball.getLoginStatus()).to.eventually.eql({access_token}).notify(done)
  })

  after(() => {
    localstorage.removeItem(config.storage_key)
  })
})
