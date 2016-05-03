/* global beforeEach, afterEach, describe, it */
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import Beachball from '../src'

chai.use(sinonChai)
chai.use(chaiAsPromised)

describe('UI', () => {
  it('should be a function', () => {
    expect(Beachball.ui).to.be.a('function')
  })

  if (typeof window !== 'undefined') {
    describe('sharing post (method: "share")', () => {
      beforeEach(() => {
        Beachball.init()
        sinon.stub(window, 'open')
      })
      it('should open a window with a query string "href"', () => {
        const params = {method: 'share', href: 'https://alivenotdead.com'}
        Beachball.ui(params)
        expect(window.open).to.have.been.calledWith(
          'https%3A%2F%2Fmig.me/share_to_migme?href=https%253A%252F%252Falivenotdead.com'
        )
      })
      afterEach(() => {
        window.open.restore()
      })
    })
  }
})
