/* global beforeEach afterEach describe expect it sinon */
import * as config from '../fixtures/config'
import Session from '../../src/lib/Session'

describe('Session', () => {
  let session

  beforeEach(() => {
    session = new Session(config.session)
  })

  it('should be instantiated', () => {
    expect(session).to.exist
    expect(session).to.be.an.instanceof(Session)
  })

  describe('Log in', () => {
    it('should have a method login()', () => {
      expect(session.login).to.exist
      expect(session.login).to.be.a('function')
    })

    it('should alias signin() to login()', () => {
      sinon.stub(session, 'login')
      expect(session.signin).to.exist
      expect(session.signin).to.be.a('function')
      session.signin()
      expect(session.login).to.be.called
      session.login.restore()
    })

    describe('as a popup window', () => {
      beforeEach(() => {
        sinon.stub(session, '_windowOpen')
      })
      it('should open a window', () => {
        session.login('popup')
        expect(session._windowOpen).to.be.calledWith(
          config.baseUrl + '/login-page/?callback_type=popup'
        )
      })
      afterEach(() => {
        session._windowOpen.restore()
      })
    })

    describe('as an embedded iframe', () => {
      it('should inject an iframe', () => {
        expect(document.querySelector('iframe')).to.not.exist
        session.login('iframe')
        expect(document.querySelector('iframe')).to.exist
        document.querySelector('iframe').remove()
      })
      it('should inject in a specific location', () => {
        const target = document.createElement('div')
        session.login('iframe', { parent: target })
        expect(target.querySelector('iframe')).to.exist
      })
    })

    describe('as a full page redirect', () => {
      beforeEach(() => {
        sinon.stub(session, '_redirect')
      })
      it('should change the browser location', () => {
        session.login('redirect')
        expect(session._redirect).to.be.called
      })
      afterEach(() => {
        session._redirect.restore()
      })
    })
  })

  describe('Log out', () => {
    it('should have a method logout()', () => {
      expect(session.logout).to.exist
      expect(session.logout).to.be.a('function')
    })

    it('should alias signout() to logout()', () => {
      sinon.spy(session, 'logout')
      expect(session.signout).to.exist
      expect(session.signout).to.be.a('function')
      session.signout()
      expect(session.logout).to.be.called
      session.logout.restore()
    })
  })

  describe('Authentication status', () => {
    it('should have a method getStatus()', () => {
      expect(session.getStatus).to.exist
      expect(session.getStatus).to.be.a('function')
    })

    it('should be asynchronous', () => {
      return expect(session.getStatus()).to.eventually.be.fulfilled
    })
  })
})
