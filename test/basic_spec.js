
//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var expect = chai.expect;

chai.use(chaiHttp);
//Our parent block
describe('Test Page', () => {
  describe('GET /', () => {
      it('it should return 200', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            });
      });

      it('it should contain Sparta Global', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.text).to.match(/.Sparta Global./);
                done();
            });
      });
  });
});