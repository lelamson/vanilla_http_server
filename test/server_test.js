'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('http server', function() {
  it('should respond to GET request at /time', function(done) {
    var date = new Date();
    chai.request('localhost:8888')
      .get('/time')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('The server time is ' + date.toLocaleTimeString());
        done();
      });
  });

  it('should respond to GET request at /greet/name', function(done) {
    chai.request('localhost:8888')
      .get('/greet/Raynor')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Hello Raynor');
        done();
      });
  });

  it('should greet to POST request', function(done) {
    chai.request('localhost:8888')
    .post('/greet')
    .send({name: 'Ghost'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(202);
      expect(res.body.msg).to.eql('Hello Ghost');
      done();
    });
  });

  it('should have a 404 page', function(done) {
    chai.request('localhost:8888')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.text).to.eql('Dead end!');
        done();
      });
  });

});
