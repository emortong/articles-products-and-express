const express = require('express');
const router = express.Router();
const data = require('../db/articles.js');
const mw = require('../middleware/middleware.js')
const fs = require('fs')

router.route('/new')
    .get((req,res) => {
      res.render('templates/articles/new')
    })

router.route('/')
  .post(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    let urlTitle = encodeURIComponent(req.body.title);
    let artData = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      urlTitle: urlTitle,
    }
    data.add(artData);
    res.redirect('/articles');
  })
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
      res.render('templates/articles/index', {
      data:data.all()
    })
  })

router.route('/:title')
  .put(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    let successful = data.editByTitle(req.body.title, req.body)
    if(successful) {
      res.redirect(`/articles/${req.params.title}`) // add 200
    } else if(successful === false) {
      res.redirect(`/articles/${req.params.title}/edit`) // radd 500
    }
  })
  .delete(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    let successful = data.deleteByTitle(req.params.title)
    if(successful) {
      res.redirect('/articles') // add 200
    } else if(successful === false) {
      res.redirect(`/articles/${req.params.title}`) // add 500
    }
  })
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    if(data.getByTitle(req.params.title) !== undefined) {
      res.render('templates/articles/item', {
        data: data.getByTitle(req.params.title)
      })
    } else {
      res.render(`templates/404`)
    }
})

router.route('/:title/edit')
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    if(data.getByTitle(req.params.title) !== undefined) {
      res.render('templates/articles/edit', {
        data: data.getByTitle(req.params.title)
      })
    } else {
      res.render(`templates/404`)
    }
  })

module.exports = router;