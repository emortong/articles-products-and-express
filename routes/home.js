const express = require('express');
const router = express.Router();
const data = require('../db/products.js');

router.route('/')
  .get((req,res) => {
    res.render('templates/home')
  })

module.exports = router