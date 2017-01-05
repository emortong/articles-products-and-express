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


router.route('/new')
    .get((req,res) => {
      res.render('templates/products/new')
    })

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
    res.render('templates/products/index', {
      data:data.all()
    })
  })

router.route('/:id')
  .put((req,res) => {
    console.log('hello');
    let successful = data.editById(req.body.id, req.body)

    if(successful) {
      res.redirect(`/products/${req.params.id}`) //add a 200
      console.log(data.all());
    } else if(successful === false) {
      res.redirect(`/products/${req.params.id}/edit`) // add a 500 status
    }
  })
  .delete((req,res) => {
    let successful = data.deleteById(req.params.id)
    if(successful) {
      console.log('yes');
      res.redirect('/products') // add a 200
    } else if(successful === false) {
      res.redirect(`/products/${req.params.id}`) // add a 500
    }
  })
  .get((req,res) => {
    res.render('templates/products/item', {
      data: data.getById(req.params.id)
    })
  })

  router.route('/:id/edit')
    .get((req,res) => {
      res.render('templates/products/edit', {
        data: data.getById(req.params.id)
      })
    })





module.exports = router;


