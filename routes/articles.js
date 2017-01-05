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

router.route('/new')
    .get((req,res) => {
      res.render('templates/articles/new')
    })

router.route('/')
  .post(validateReq, (req,res) => {
    console.log(req.body);
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
    res.render('templates/articles/index', {
      data:data.all()
    })
  })

router.route('/:title')
  .put((req,res) => {
    console.log('hi');
    console.log(req.body.title, req.body);
    let successful = data.editByTitle(req.body.title, req.body)
    console.log(successful)
    if(successful) {
      res.redirect(`/articles/${req.params.title}`) // add 200
    } else if(successful === false) {
      res.redirect(`/articles/${req.params.title}/edit`) // radd 500
    }
  })
  .delete((req,res) => {
    let successful = data.deleteByTitle(req.params.title)
    console.log(successful);
    if(successful) {
      res.redirect('/articles') // add 200
    } else if(successful === false) {
      res.redirect(`/articles/${rec.params.title}`) // add 500
    }
  })
  .get((req,res) => {
  res.render('templates/articles/item', {
    data: data.getByTitle(req.params.title)
  })
})

router.route('/:title/edit')
    .get((req,res) => {
      res.render('templates/articles/edit', {
        data: data.getByTitle(req.params.title)
      })
    })


module.exports = router;