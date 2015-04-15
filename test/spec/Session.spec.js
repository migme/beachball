/* global before after beforeEach describe expect it sinon */
'use strict'
import Session from '../../src/lib/Session'

describe('Session', () => {
  let session

  beforeEach(() => {
    session = new Session()
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
      sinon.spy(session, 'login')
      expect(session.signin).to.exist
      expect(session.signin).to.be.a('function')
      session.signin()
      expect(session.login).to.be.called
      session.login.restore()
    })

    describe('as a popup window', () => {
      before(() => {
        sinon.spy(window, 'open')
      })
      after(() => {
        window.open.restore()
      })
      it('should open a window', () => {
        session.login('popup')
        expect(window.open).to.be.calledWith(
          '/login-page/?callback_type=popup'
        )
      })
    })

    describe('as an embedded iframe', () => {
      it('should inject an iframe', () => {
        expect(document.querySelector('iframe')).to.not.exist
        session.login('iframe')
        expect(document.querySelector('iframe')).to.exist
      })
    })

    describe('as a full page redirect', () => {
      it('should change the browser location', () => {
        let shim = () => {}
        let original = session._redirect
        session._redirect = shim
        sinon.spy(session, '_redirect')

        session.login('redirect')
        expect(session._redirect).to.be.called

        session._redirect.restore()
        session._redirect = original
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
      expect(session.getStatus()).to.have.a.key('then')
    })
  })
})
