const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;

describe('POST /products', () => {
  it('respond with redirect /products if valid data', (done) => {
    request(app)
      .post('/products')
      .type('form')
      .send({
        name: 'Red Bag',
        price: '100',
        inventory: '32'
      })
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products')
        done()
      })
  })
  it('if data invalid or no data is sent respond with redirect /new', (done) => {
    request(app)
      .post('/products')
      .type('form')
      .send({name: 'hi'})
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/new')
        done()
      })
  })
})

describe('PUT /products/:id', () => {
  it('Edits a product. Finds a product in a collection with the same id value and updates the information', (done) => {
    request(app)
      .put('/products/1')
      .type('form')
      .send({
        id: 1,
        name: 'apple'
      })
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/1')
        done()
      })
  })
  it('Should redirect to /:id/edit if unsuccesful', (done) => {
    request(app)
    .put('/products/1')
      .type('form')
      .send({
        id: 1
      })
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/1/edit')
        done()
      })
  })
})

describe('DELETE /products/:id', () => {
  it('removes a product by id', (done) => {
    request(app)
      .delete('/products/1')
      .type('form')
      .send({
        id: 1,
      })
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products')
        done()
      })
  })
  it('redirects to /products/:id if unsuccessful', (done) => {
    request(app)
      .delete('/products/1')
      .type('form')
      .send({})
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/1')
        done()
      })
  })
})