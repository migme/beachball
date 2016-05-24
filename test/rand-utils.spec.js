/* global describe, it */
import { expect } from 'chai'
import { getRandCode } from '../src/utils/rand'

describe('Get Random Code', () => {
  it('should produce a random code with length 15', () => {
    expect(getRandCode(15).length).to.equal(15)
  })

  it('should contains A-Za-z0-9', () => {
    expect(/^[a-zA-Z0-9]*$/.test(getRandCode(15))).to.equal(true)
  })
})
