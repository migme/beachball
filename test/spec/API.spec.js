/* global afterEach beforeEach describe expect it sinon */
import * as config from '../fixtures/config'
import API from '../../src/lib/API'

describe('API', () => {
  let api

  beforeEach(() => {
    api = new API(Object.assign(config.session, {
      Session: {
        getStatus: sinon.stub().returns(Promise.resolve(config.session))
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
    beforeEach(() => {
      sinon.stub(window, 'fetch').returns(Promise.resolve())
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('should call the correct uri', async () => {
      await api.url('/me').should.eventually.be.fulfilled
      expect(window.fetch).to.be.calledOnce
    })
  })
})
