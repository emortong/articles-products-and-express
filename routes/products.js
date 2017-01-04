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
    data.push(prodData);
    console.log(data);
    res.redirect('/products');
  })
  .get((req,res) => {
    res.render('templates/products/index')
  })


router.route('/:id')
  .put((req,res, next) => {
    let successful = null;
    data.forEach((x) => {
      if(req.body.id === x.id.toString()) {
        if(req.body.name !== undefined) {
          x.name = req.body.name;
          successful = true;
        } else if(req.body.price !== undefined) {
          x.price = req.body.price;
          successful = true;
        } else if(req.body.inventory !== undefined) {
          x.inventory = req.body.inventory
          successful = true;
        } else {
          successful = false;
        }
      }
    })
    if(successful) {
      res.redirect(200, '/products/1') // change 1 to :id
    } else if(successful === false) {
      res.redirect(500, '/products/1/edit') // recheck status change 1 to :id
    }
    next();
  })
  .delete((req,res) => {
    let successful = false;
    data.forEach((x) => {
      if(x.id.toString() === req.params.id) {
        let index = data.indexOf(x);
        data.splice(index, 1);
        successful = true;
      }
    })
    console.log(successful);
    if(successful) {
      console.log('yes');
      res.redirect(200, '/products')
    } else if(successful === false) {
      res.redirect(500, '/products/1') // recheck status change 1 to id
    }
    console.log(data)
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


