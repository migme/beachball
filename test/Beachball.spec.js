/* global beforeEach describe it */
import {expect} from 'chai'
import Beachball from '../src'
import API from '../src/lib/API'
import Session from '../src/lib/Session'

describe('Beachball', () => {
  let beachball
  const client_id = '309f818242abae8fdd1b'
  const access_token = 'TESTING'

  beforeEach(() => {
    beachball = new Beachball({
      client_id,
      access_token
    })
  })

  it('should be instantiated', () => {
    expect(beachball).to.exist
    expect(beachball).to.be.an.instanceof(Beachball)
  })

  it('should expose Session', () => {
    expect(beachball.Session).to.exist
    expect(beachball.Session).to.be.an.instanceof(Session)
  })

  it('should expose API', () => {
    expect(beachball.API).to.exist
    expect(beachball.API).to.be.an.instanceof(API)
  })

  it('should expose configuration', () => {
    expect(beachball).to.contain.all.keys([
      'client_id',
      'access_token',
      'baseUrl'
    ])
  })

  it('should work without options', () => {
    expect(() => new Beachball()).not.to.throw(TypeError)
  })
})
