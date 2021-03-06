/* global afterEach, beforeEach, describe, it */
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import api from '../src/lib/API'
import config from '../src/config'

chai.use(chaiAsPromised)
chai.use(sinonChai)

const baseUrl = 'https://localhost'
const access_token = '1234567890'
Object.assign(config, {
  baseUrl,
  access_token,
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
      expect(stub).to.have.been.calledWith(`${baseUrl}/me`, {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${access_token}`,
        },
      })
    })

    it('should call the correct uri', () => {
      api('/me')
      expect(stub).to.have.been.calledOnce // eslint-disable-line no-unused-expressions
    })

    it('should call with updated headers', () => {
      api('/me', {}, false)
      expect(stub).to.have.been.calledWith(`${baseUrl}/me`, {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      })
    })
  })
})
