/* global afterEach, beforeEach, describe, it */
import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import api from '../src/lib/API'
import config from '../src/config'

chai.use(chaiAsPromised)

const baseUrl = 'https://localhost'
const access_token = '1234567890'
Object.assign(config, {
  baseUrl,
  access_token
})

const self = typeof window === 'undefined' ? global : window

describe('API', () => {
  it('should be a function', () => {
    expect(api).to.be.a('function')
  })

  describe('url endpoint utility', () => {
    let stub
    beforeEach(() => {
      stub = sinon.stub(self, 'fetch')
    })

    afterEach(() => {
      stub.restore()
    })

    it('should add a slash at the start', () => {
      api('me')
      expect(stub).to.have.been.calledWith(baseUrl + '/me', {
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + access_token
        }
      })
    })

    it('should call the correct uri', () => {
      api('/me')
      expect(stub).to.have.been.calledOnce
    })

    it('should call with updated headers', () => {
      api('/me', { headers: { 'content-type': 'multipart/form-data' } })
      expect(stub).to.have.been.calledWith(baseUrl + '/me', {
        headers: {
          'content-type': 'multipart/form-data',
          authorization: 'Bearer ' + access_token
        }
      })
    })
  })
})
