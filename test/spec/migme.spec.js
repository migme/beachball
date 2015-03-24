'use strict';
import {Migme} from '../../src/migme';

describe('migme', function () {

  var migme;

  beforeEach(function () {
    migme = new Migme({
      client_id: '',
      redirect_uri: ''
    });
  });

  it('should be defined', function () {
    expect(migme).to.exist;
  });

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

});
