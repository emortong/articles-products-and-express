const express = require('express');
const router = express.Router();
const data = require('../db/products.js');
const mw = require('../middleware/middleware.js')
const fs = require('fs')


router.route('/new')
    .get(mw.analyticsTracker,(req,res) => {
      res.render('templates/products/new')
    })

router.route('/')
  .post(mw.analyticsTracker, mw.headerValidation, (req,res) => {
      let prodData = {
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
      }
    data.add(prodData)
      .then( products => {
        res.redirect('/products');
      })
  })
  .get(mw.analyticsTracker,mw.headerValidation,  (req,res) => {
    data.all()
      .then( products => {
        res.render('templates/products/index', {products})
      })
  })

router.route('/:id')
  .put(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    data.editById(req.body)
      .then( products => {
        res.redirect(`/products/${req.params.id}`)
      })
      .catch( e => {
        res.redirect(`/products/${req.params.id}/edit`)
      })
  })
  .delete(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    data.deleteById(req.params.id)
      .then( products => {
        if(products !== undefined) {
          res.redirect('/products') // add a 200
        } else {
          res.redirect(`/products/new`) // add a 500
        }
      })
  })
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    data.getById(req.params.id)
      .then( products => {
        products = products[0];
        res.render('templates/products/item', {products})
      })
      .catch( e => {
        res.render(`templates/404`)
      })
  })

router.route('/:id/edit')
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    data.getById(req.params.id)
      .then( products => {
        products = products[0];
        if(products !== undefined) {
          res.render('templates/products/edit', {products})
        } else {
          res.render(`templates/404`)
        }
      })
      .catch( e => {
        console.error(e);
      })
  })

module.exports = router;


