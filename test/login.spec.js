/* global beforeEach, afterEach, describe, it */
import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import Beachball from '../src'
import config from '../src/config'

chai.use(sinonChai)
chai.use(chaiAsPromised)

const baseUrl = 'https://localhost'
const access_token = '1234567890'
Object.assign(config, {
  baseUrl,
  access_token
})

describe('Login', () => {
  it('should be a function', () => {
    expect(Beachball.login).to.be.a('function')
  })

  if (typeof window !== 'undefined') {
    describe('as a popup window', () => {
      beforeEach(() => {
        sinon.stub(window, 'open')
      })
      it('should open a window', () => {
        Beachball.login('popup')
        expect(window.open).to.have.been.calledWith(
          baseUrl + '/login-page/?callback_type=popup'
        )
      })
      afterEach(() => {
        window.open.restore()
      })
    })

    // describe('as an embedded iframe', () => {
    //   it('should inject an iframe', () => {
    //     expect(document.querySelector('iframe')).to.not.exist
    //     Beachball.login('iframe')
    //     expect(document.querySelector('iframe')).to.exist
    //     document.querySelector('iframe').remove()
    //   })
    //   it('should inject in a specific location', () => {
    //     const target = document.createElement('div')
    //     Beachball.login('iframe', { parent: target })
    //     expect(target.querySelector('iframe')).to.exist
    //   })
    // })

    describe('as a full page redirect', () => {
      // beforeEach(() => {
      //   sinon.stub(Beachball, '_redirect')
      // })
      it('should change the browser location', () => {
        // Beachball.login('redirect')
        // expect(window.location.href).to.equal('https://api.mig.me/login-page/?callback_type=redirect')
      })
      // afterEach(() => {
      //   Beachball._redirect.restore()
      // })
    })
  }
})
