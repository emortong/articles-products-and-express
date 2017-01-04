const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;

describe('POST /products', () => {
  it('creates a new product', (done) => {
    request(app)
      .get('/products')
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      // .expect(200,done);
  })
})