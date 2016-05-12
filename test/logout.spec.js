/* global describe, it */
import { expect } from 'chai'
import localstorage from 'universal-localstorage'
import Beachball from '../src'
import config from '../src/config'

const access_token = '1234567890'

describe('Logout', () => {
  it('should be a function', () => {
    expect(Beachball.logout).to.be.a('function')
  })

  it('should remove the session', () => {
    localstorage.setItem(config.storage_key, JSON.stringify({ access_token }))
    expect(localstorage.getItem(config.storage_key)).to.equal(JSON.stringify({ access_token }))
    Beachball.logout()
    expect(config.access_token).to.equal('')
    expect(localstorage.getItem(config.storage_key)).to.equal(null)
  })
})
