/* global describe, it */
import {expect} from 'chai'
import Beachball from '../src'
import config from '../src/config'

const scope = 'chat'

describe('Scope', () => {
  it('should be a function', () => {
    expect(Beachball.setScope).to.be.a('function')
  })

  it('should set the scope', () => {
    expect(Beachball.setScope(scope)).to.equal(scope)
    expect(config.scope).to.equal(scope)
  })

  it('should throw an error', () => {
    const NOT_A_STRING = 42
    expect(() => Beachball.setScope(NOT_A_STRING)).to.throw(Error)
  })
})
