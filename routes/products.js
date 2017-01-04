const express = require('express');
const router = express.Router();
const data = require('../db/products.js');

let numId = 0;

const validateReq = (req,res,next) => {
  let x = req.body;
  if(typeof x.name === 'string' && typeof x.price === 'string' && typeof x.inventory === 'string') {
    next();
  } else {
    res.status(500).redirect('/products/new')
  }
}

router.route('/')
  .post(validateReq, (req,res) => {
      numId++
      let prodData = {
        id: numId,
        name: req.body.name,
        price: req.body.price,
        inventory: req.body.inventory,
      }
    data.add(prodData)
    console.log(data.all());
    res.redirect('/products');
  })
  .get((req,res) => {
    res.render('templates/products/index')
  })

router.route('/:id')
  .put((req,res) => {
    let successful = data.editById(req.body.id, req.body)
    console.log(data.all());
    if(successful) {
      console.log('hi');
      res.redirect(200, '/products/1') // change 1 to :id
    } else if(successful === false) {
      res.redirect(500, '/products/1/edit') // recheck status change 1 to :id
    }
  })
  .delete((req,res) => {
    let successful = data.deleteById(req.params.id)
    if(successful) {
      console.log('yes');
      res.redirect(200, '/products')
    } else if(successful === false) {
      res.redirect(500, '/products/1') // recheck status change 1 to id
    }
  })

  router.route('/:id/edit')
    .get((req,res) => {
      res.render('templates/products/edit')
    })

  router.route('/new')
    .get((req,res) => {
      res.render('templates/products/new')
    })

module.exports = router;


