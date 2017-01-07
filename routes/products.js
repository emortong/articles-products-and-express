const express = require('express');
const router = express.Router();
const data = require('../db/products.js');
const mw = require('../middleware/middleware.js')
const fs = require('fs')

let numId = 0;

router.route('/new')
    .get(mw.analyticsTracker,(req,res) => {
      res.render('templates/products/new')
    })

router.route('/')
  .post(mw.analyticsTracker, mw.headerValidation, (req,res) => {
      numId++
      let prodData = {
        id: numId,
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
      }
    data.add(prodData)
    res.redirect('/products');
  })
  .get(mw.analyticsTracker,mw.headerValidation,  (req,res) => {
    res.render('templates/products/index', {
      data:data.all()
    })
  })

router.route('/:id')
  .put(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    let successful = data.editById(req.body.id, req.body)
    if(successful) {
      res.redirect(`/products/${req.params.id}`) //add a 200
    } else if(successful === false) {
      res.redirect(`/products/${req.params.id}/edit`) // add a 500 status
    }
  })
  .delete(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    let successful = data.deleteById(req.params.id)
    if(successful) {
      res.redirect('/products') // add a 200
    } else if(successful === false) {
      res.redirect(`/products/new`) // add a 500
    }
  })
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    if(data.getById(req.params.id) !== undefined) {
      res.render('templates/products/item', {
        data: data.getById(req.params.id)
      })
    } else {
      res.render(`templates/404`)
    }
  })

router.route('/:id/edit')
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    if(data.getById(req.params.id) !== undefined) {
      res.render('templates/products/edit', {
        data: data.getById(req.params.id)
      })
    } else {
      res.render(`templates/404`)
    }
  })

module.exports = router;


