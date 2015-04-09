'use strict';
import Migme from '../../src/migme';

describe('migme', () => {

  let migme;
  const client_id = '309f818242abae8fdd1b';
  const access_token = 'TESTING';
  const API_BASE = 'https://migme-sandcastle.herokuapp.com';
  const OAUTH_BASE = 'https://oauth.mig.me/oauth';

  beforeEach(() => {
    migme = new Migme({
      client_id: client_id,
      access_token: access_token
    });
  });

  it('should be defined', () => {
    expect(migme).to.exist;
  });

  /*
    Check if the functions exist
   */
  it('should have a method login()', () => {
    expect(migme.login).to.exist;
    expect(migme.login).to.be.a('function');
  });

  it('should have a method logout()', () => {
    expect(migme.logout).to.exist;
    expect(migme.logout).to.be.a('function');
  });

  it('should have a method api()', () => {
    expect(migme.api).to.exist;
    expect(migme.api).to.be.a('function');
  });

  it('should have a method getLoginStatus()', () => {
    expect(migme.getLoginStatus).to.exist;
    expect(migme.getLoginStatus).to.be.a('function');
  });

  describe('API_BASE', () => {
    it('should not be able to see API_BASE', () => {
      expect(migme.API_BASE).to.not.exist;
    });
  });

  describe('OAUTH_BASE', () => {
    it('should not be able to see OAUTH_BASE', () => {
      expect(migme.OAUTH_BASE).to.not.exist;
    });
  });

  describe('migme.api()', () => {

    afterEach(() => {
      window.fetch.restore();
    });

    it('should call the correct uri', () => {
      sinon.spy(window, 'fetch');

      migme.api('/me');

      expect(window.fetch).to.be.calledWith(API_BASE + '/me', {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      });
    });
  });

  describe('migme.login()', () => {

    it('should call the api and inject an iframe', () => {
      sinon.spy(window, 'open');

      var scopes = ['test-scope'];

      migme.login(scopes);

      expect(window.open).to.be.calledWith('https://login.mig.me/' +
            '?client_id=' + client_id +
            '&scope=' + scopes +
            '&response_type=code');
    });

  });

  describe('migme getLoginStatus()', () => {
    afterEach(() => {
      window.fetch.restore();
    });

    it('should call the correct api', () => {
      sinon.spy(window, 'fetch');

      migme.getLoginStatus();

      expect(window.fetch).to.be.calledWith(OAUTH_BASE + '/loginstatus');
    });
  });

});
