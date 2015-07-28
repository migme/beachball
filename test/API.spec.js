/* global afterEach, beforeEach, describe, it */
import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import API from '../src/lib/API'

chai.use(chaiAsPromised)

const baseUrl = 'https://localhost'
const access_token = '1234567890'
const session = {
  baseUrl,
  access_token
}

const self = typeof window === 'undefined' ? global : window

describe('API', () => {
  let api

  beforeEach(() => {
    api = new API(Object.assign(session, {
      Session: {
        getStatus: sinon.stub().returns(Promise.resolve(session))
      }
    }))
  })

  it('should be instantiated', () => {
    expect(api).to.exist
    expect(api).to.be.an.instanceof(API)
  })

  it('should have a method url()', () => {
    expect(api.url).to.exist
    expect(api.url).to.be.a('function')
  })

  describe('url endpoint utility', () => {
    let stub
    beforeEach(() => {
      stub = sinon.stub(self, 'fetch')
    })

    afterEach(() => {
      stub.restore()
    })

    it('should call the correct uri', async () => {
      await api.url('/me')
      expect(stub).to.have.been.calledOnce
    })
  })
})
