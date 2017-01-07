const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;
const data = require('../db/articles.js');
const products = require('../db/products.js');

// describe('Articles database', () => {

//  it('Should have a method that returns all items in database', () => {
//     expect(data.all).to.be.a('function');
//     expect(data.all()).to.be.an('array');
//   })

//   it('Should have a method that adds an article to the database', () => {
//     let artData = {
//       title: 'hello',
//       body: 'this is body',
//       author: 'estefania',
//       urlTitle: 'hello',
//     }
//     data.add(artData);
//     expect(data.add).to.be.a('function');
//     expect(data.all()).to.have.lengthOf(1);
//   })

//   it('Should have a method that gets an article by title name', () => {
//     expect(data.getByTitle).to.be.a('function');
//     expect(data.getByTitle('hello')).to.be.an('object');
//     expect(data.getByTitle('hello')).to.have.property('title', 'hello');
//   })

//   it('Should have a method that edits an article by title name', () => {
//     data.editByTitle('hello', {author: 'anna'})
//     expect(data.editByTitle).to.be.a('function');
//     expect(data.getByTitle('hello')).to.have.property('author', 'anna')
//   })

//   it('Should have a method that deletes an object from the database by title name', () => {
//     expect(data.deleteByTitle).to.be.a('function');
//     data.deleteByTitle('hello');
//     expect(data.all()).to.have.lengthOf(0);
//   })
// })

// describe('Products database', () => {

//  it('Should have a method that returns all items in database', () => {
//     expect(products.all).to.be.a('function');
//     expect(products.all()).to.be.an('array');
//   })

//   it('Should have a method that adds a product to the products database', () => {
//     let prod = {
//       id: 1,
//       name: 'apple',
//       price: '2',
//       inventory: '3',
//     }
//     products.add(prod);
//     expect(products.add).to.be.a('function');
//     expect(products.all()).to.have.lengthOf(1);
//   })

//   it('Should have a method that gets a product by id', () => {
//     expect(products.getById).to.be.a('function');
//     expect(products.getById('1')).to.be.an('object');
//     expect(products.getById('1')).to.have.property('name', 'apple');
//   })

//   it('Should have a method that edits a product by id', () => {
//     products.editById('1', {price: '3'})
//     expect(products.editById).to.be.a('function');
//     expect(products.getById('1')).to.have.property('price', '3')
//   })

//   it('Should have a method that deletes an object from the productsbase by id', () => {
//     expect(products.deleteById).to.be.a('function');
//     products.deleteById('1');
//     expect(products.all()).to.have.lengthOf(0);
//   })
// })
