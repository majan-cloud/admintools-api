const request = require('supertest');
const assert  = require('chai').assert;
const sinon = require('sinon');
const server  = require('../support/server');
const fh     = require("../support/fixture-helper.js");
const log     = require('metalogger')();

describe('users endpoint', function() {
  let app;

  beforeEach(function (done) {
    app = server.express();
    server.beforeEach(app, function() {
      done();
    });
  });

  afterEach(function () {
  });

  before(function() {

    this.sinonbox = sinon.sandbox.create();

    const usersModel = require('users/models/users');
    this.getUsers = this.sinonbox.stub(usersModel.prototype, 'getUsers').callsFake(function() {
      return new Promise(function(resolve, reject) {
        fh.loadFixture("users-list.json").then(function(sampleUsersList) {
          resolve(JSON.parse(sampleUsersList));
        }).catch(function(err) {
          log.error(err);
        });        
      });
    });
  });

  after(function() {
    this.sinonbox.restore();
  });

  // Note: depends on the usersModel stub.
  it('GET /users returns proper data', function(done) {
    request(app)
      .get('/users')
      .expect('Content-Type', /application\/hal\+json.*/)
      .expect(200)
      .expect(function(response) {
        var payload = response.body;
        assert.property(payload, '_links');
        assert.property(payload, 'users');
        assert.equal(payload._links.self.href, '/users');
        assert.equal(payload.users.length, 2);
        assert.equal(payload.users[0].email, 'first@example.com');
        assert.equal(payload.users[1].uuid, '229b673c-a2c5-4729-84eb-ff30d42ab133');
      })
      .end(done);
  });

});
