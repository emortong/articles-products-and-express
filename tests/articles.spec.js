const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;

describe('POST /articles', () => {
  it('respond with redirect /articles if valid data', (done) => {
    request(app)
      .post('/articles')
      .type('form')
      .send({
        title: 1,
        body: 'bla bla bla',
        author: '32'
      })
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/articles')
        done()
      })
  })
  it('if data invalid or no data is sent respond with redirect /new', (done) => {
    request(app)
      .post('/articles')
      .type('form')
      .send({title: 'hi'})
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/articles/new')
        done()
      })
  })
})

describe('PUT /articles/:title', () => {
  it('updates a product by its title', (done) => {
    request(app)
      .put('/articles/1')
      .type('form')
      .send({
        title: 1,
        body: 'bla bla bla'
      })
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/articles/1')
        done()
      })
  })
  it('Should redirect to /:title/edit if unsuccesful', (done) => {
    request(app)
    .put('/articles/1')
      .type('form')
      .send({
      })
      .end(function(err,res){
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/articles/1/edit')
        done()
      })
  })
})

describe('DELETE /articles/:title', () => {
  it('removes a product by title', (done) => {
    request(app)
      .delete('/articles/1')
      .type('form')
      .send({
        title: 1,
      })
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/articles')
        done()
      })
  })
  it('redirects to /articles/:title if unsuccessful', (done) => {
    request(app)
      .delete('/articles/1')
      .type('form')
      .send({})
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/articles/1')
        done()
      })
  })
})

describe('GET /articles', () => {
  it('directs the user to /articles', (done) => {
  request(app)
    .get('/articles')
    .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.text).to.be.a('string')
        expect('Content-Type', 'text/html')
        done()
      })
  })
})

describe('GET /articles/:id/edit', () => {
  it('directs the user to /articles', (done) => {
  request(app)
    .get('/articles/1/edit')
    .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.text).to.be.a('string')
        expect('Content-Type', 'text/html')
        done()
      })
  })
})

describe('GET /articles/new', () => {
  it('directs the user to /articles', (done) => {
  request(app)
    .get('/articles/new')
    .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.text).to.be.a('string')
        expect('Content-Type', 'text/html')
        done()
      })
  })
})