const express = require('express');
const router = express.Router();
const data = require('../db/articles.js');

const validateReq = (req,res,next) => {
  let x = req.body;
  if(typeof x.title === 'string' && typeof x.body === 'string' && typeof x.author === 'string') {
    next();
  } else {
    res.status(500).redirect('/articles/new')
  }
}

router.route('/')
  .post(validateReq, (req,res) => {
    let urlTitle = encodeURIComponent(req.body.title);
    let artData = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      urlTitle: urlTitle,
    }
    data.add(artData);
    console.log(data.all())
    res.redirect('/articles');
  })
  .get((req,res) => {
    res.render('templates/articles/index')
  })

router.route('/:title')
  .put((req,res) => {
    let successful = data.editByTitle(req.body.title, req.body)
    if(successful) {
      res.redirect(200, '/article/:title') // change 1 to :id
    } else if(successful === false) {
      res.redirect(500, '/articles/:title/edit') // recheck status change 1 to :id
    }
  })
  .delete((req,res) => {
    let successful = data.deleteById(req.params.title)
    if(successful) {
      res.redirect(200, '/articles')
    } else if(successful === false) {
      res.redirect(500, '/articles/:title') // recheck status change 1 to id
    }
  })

router.route('/:title/edit')
    .get((req,res) => {
      res.render('templates/articles/edit')
    })

  router.route('/new')
    .get((req,res) => {
      res.render('templates/articles/new')
    })

module.exports = router;