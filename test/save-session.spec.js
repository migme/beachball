/* global describe, it, after */
import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'
import localstorage from 'universal-localstorage'
import saveSession from '../src/lib/save-session'
import config from '../src/config'

chai.use(chaiAsPromised)

const access_token = '1234567890'
const foo = 'bar'

describe('Save Session', () => {
  it('should be a function', () => {
    expect(saveSession).to.be.a('function')
  })

  it('should save data', () => {
    saveSession({access_token, foo})
    expect(localstorage.getItem(config.storage_key)).to.equal(JSON.stringify({access_token, foo}))
  })

  it('should return a promise', done => {
    expect(saveSession()).to.eventually.equal(null).notify(done)
  })

  after(() => {
    localstorage.removeItem(config.storage_key)
  })
})
