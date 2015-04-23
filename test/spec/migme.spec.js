/* global beforeEach describe expect it */
'use strict'
import Migme from '../../src/migme'
import API from '../../src/lib/API'
import Session from '../../src/lib/Session'

describe('Migme', () => {
  let migme
  const client_id = '309f818242abae8fdd1b'
  const access_token = 'TESTING'

  beforeEach(() => {
    migme = new Migme({
      client_id: client_id,
      access_token: access_token
    })
  })

  it('should be instantiated', () => {
    expect(migme).to.exist
    expect(migme).to.be.an.instanceof(Migme)
  })

  it('should expose Session', () => {
    expect(migme.Session).to.exist
    expect(migme.Session).to.be.an.instanceof(Session)
  })

  it('should expose API', () => {
    expect(migme.API).to.exist
    expect(migme.API).to.be.an.instanceof(API)
  })

  it('should expose configuration', () => {
    expect(migme).to.contain.all.keys([
      'client_id',
      'access_token',
      'baseUrl'
    ])
  })

  it('should work without options', () => {
    expect(() => new Migme()).not.to.throw(TypeError)
  })
})
