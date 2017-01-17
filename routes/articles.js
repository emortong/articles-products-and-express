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
      urltitle: urltitle,
    }
    data.add(artData)
      .then( articles => {
        res.redirect('/articles')
      })
      .catch( e => {
        res.redirect('/articles/new');
      })
  })
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
      data.all()
      .then( articles => {
        res.render('templates/articles/index', {articles})
    })
  })

router.route('/:title')
  .put(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    let toEdit = {
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    }
    data.editByTitle(toEdit)
      .then( articles => {
        res.redirect(`/articles/${req.params.title}`)
      })
      .catch( e => {
        res.redirect(`/articles/${req.params.title}/edit`)
      })
  })
  .delete(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    data.deleteByTitle(req.params.title)
      .then( articles => {
        if(articles !== undefined) {
          res.redirect('/articles')
        } else {
          res.redirect(`/articles/${req.params.title}`)
        }
      })
      .catch( e => {
        console.error(e)
      })
  })
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
      data.getByTitle(req.params.title)
        .then( articles => {
          articles = articles[0];
          res.render('templates/articles/item', {articles})
        })
        .catch( e => {
          res.render(`templates/404`)
        })
})

router.route('/:title/edit')
  .get(mw.analyticsTracker, mw.headerValidation, (req,res) => {
    data.getByTitle(req.params.title)
      .then( articles => {
        articles = articles[0]
        if(articles !== undefined) {
          res.render('templates/articles/edit', {articles})
        } else {
          res.render(`templates/404`)
        }
      })
      .catch( e => {
        console.error(e);
      })
  })

module.exports = router;