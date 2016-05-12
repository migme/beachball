/* global beforeEach, afterEach, describe, it */
import chai, { expect } from 'chai'
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
        const params = { method: 'share', href: 'https://alivenotdead.com' }
        Beachball.ui(params)
        expect(window.open).to.have.been.calledWith(
          'https://mig.me/share_to_migme?href=https%253A%252F%252Falivenotdead.com'
        )
      })
      afterEach(() => {
        window.open.restore()
      })
    })

    describe('generate a share button by HTML', () => {
      const shareButtonClassName = 'migme-share-button'

      beforeEach(() => {
        const testDiv = document.createElement('div')
        testDiv.className = shareButtonClassName
        testDiv.setAttribute('data-href', 'https://alivenotdead.com')
        testDiv.setAttribute('data-layout', 'button')

        document.body.appendChild(testDiv)

        Beachball.init()
      })

      it('should create a <span> and inside of the <div> container', () => {
        const elements = document.getElementsByClassName(shareButtonClassName)
        const children = elements[0].childNodes
        expect(children.length).to.equal(1)
      })

      it('should create an iframe inside of the <span> in the <div> container', () => {
        const elements = document.getElementsByClassName(shareButtonClassName)
        const children = elements[0].childNodes
        const childrenInSpan = children[0].childNodes
        expect(childrenInSpan.length).to.equal(1)
      })

      it('should embed correct src of the iframe', () => {
        const elements = document.getElementsByClassName(shareButtonClassName)
        const children = elements[0].childNodes
        const childrenInSpan = children[0].childNodes
        const iframe = childrenInSpan[0]
        expect(iframe.getAttribute('src').indexOf('https://connect.mig.me/plugins/share_button?client_id=')).should.not.equal(-1)
      })

      it('should use width and height for layout "button"', () => {
        const elements = document.getElementsByClassName(shareButtonClassName)
        const children = elements[0].childNodes
        const testSpan = children[0]
        expect(testSpan.style.width).to.equal('58px')
        expect(testSpan.style.height).to.equal('20px')
      })

      it('should use default width and height for unset layout', () => {
        // reset
        document.body.innerHTML = ''

        const newTestDiv = document.createElement('div')
        newTestDiv.className = shareButtonClassName
        newTestDiv.setAttribute('data-href', 'https://alivenotdead.com')
        newTestDiv.setAttribute('data-layout', 'non-exsited-layout')

        document.body.appendChild(newTestDiv)

        Beachball.init()

        const elements = document.getElementsByClassName(shareButtonClassName)
        const children = elements[0].childNodes
        const testSpan = children[0]
        expect(testSpan.style.width).to.equal('58px')
        expect(testSpan.style.height).to.equal('20px')
      })
    })
  }
})
