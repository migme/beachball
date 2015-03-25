'use strict';
import Migme from '../../src/migme';

describe('migme', function () {

  var migme;
  var client_id = '309f818242abae8fdd1b';
  var access_token = 'TESTING';

  beforeEach(function () {
    migme = new Migme({
      client_id: client_id,
      // redirect_uri: 'http://localhost:8080/oauth/callback',
      access_token: access_token
    });
  });

  it('should be defined', function () {
    expect(migme).to.exist;
  });

  /*
    Check if the functions exist
   */
  it('should have a method login()', function () {
    expect(migme.login).to.exist;
    expect(migme.login).to.be.a('function');
  });

  it('should have a method logout()', function () {
    expect(migme.logout).to.exist;
    expect(migme.logout).to.be.a('function');
  });

  it('should have a method api()', function () {
    expect(migme.api).to.exist;
    expect(migme.api).to.be.a('function');
  });

  it('should have a method getLoginStatus()', function () {
    expect(migme.getLoginStatus).to.exist;
    expect(migme.getLoginStatus).to.be.a('function');
  });

  describe('API_BASE', function () {
    it('should not be able to write to API_BASE', function () {
      let b = migme.API_BASE;
      let fn = function () { migme.API_BASE = 'something' };
      expect(fn).to.throw(TypeError);
    });
  });

  describe('OAUTH_BASE', function () {
    it('should not be able to write to OAUTH_BASE', function () {
      let b = migme.OAUTH_BASE;
      let fn = function () { migme.OAUTH_BASE = 'something' };
      expect(fn).to.throw(TypeError);
    });
  });

  describe('migme.api()', function () {
    let API_BASE = 'https://api.mig.me';

    it('should call the correct uri', function () {
      sinon.spy(window, 'fetch');

      migme.api('/me');

      expect(window.fetch).to.be.calledWith(API_BASE + '/me', {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      });
    });
  });


  describe('migme.login()', function () {

    it('should call the api and inject an iframe', function () {
      sinon.spy(window, 'open');

      var scopes = ['test-scope'];

      migme.login(scopes);

      expect(window.open).to.be.calledWith('https://login.mig.me/' +
            '?client_id=' + client_id +
            '&scope=' + scopes +
            '&response_type=code');
    });

  });

});
