/* global afterEach beforeEach describe expect it sinon */
'use strict'
import * as config from '../fixtures/config'
import API from '../../src/lib/API'

describe('API', () => {
  let api

  beforeEach(() => {
    api = new API(config.session)
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
      sinon.spy(window, 'fetch')
    })

    afterEach(() => {
      window.fetch.restore()
    })

    it('should call the correct uri', () => {
      const endpoint = '/me'
      api.url(endpoint)
      expect(window.fetch).to.be.calledWith(config.baseUrl + endpoint, {
        Authorization: 'Bearer ' + config.accessToken,
        'content-type': 'application/json'
      })
    })
  })
})
