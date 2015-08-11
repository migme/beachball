/* global describe, it */
import {expect} from 'chai'
import {trim as trimHash} from '../src/utils/hash'

describe('Trim Hash', () => {
  if (typeof window !== 'undefined') {
    it('should trim the hash', () => {
      window.location.hash = '#a=1&b=2&c=3'
      trimHash()
      expect(window.location.hash).to.equal('')
    })
  }
})
