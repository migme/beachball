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
  }
})
