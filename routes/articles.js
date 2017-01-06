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

const headerValidation = (req,res,next) => {
  if(req.httpVersion === '1.1') {
    next();
  } else {
    res.send({error: 'bad headers'})
  }
}

const analyticsTracker = (req, res, next) => {
  let method = req.method;
  let uri = `/articles${req.url}`
  let timestamp =  new Date()
  let day = timestamp.getDate();
  let month = timestamp.getMonth() + 1;
  let year = timestamp.getFullYear();
  let hours = timestamp.getHours();
  let min = timestamp.getMinutes();
  let sec = timestamp.getSeconds()
  day = addCero(day);
  month = addCero(month)
  hours = addCero(hours);
  min = addCero(min);
  sec = addCero(sec);

  function addCero(x) {
    if(x.toString().length === 1) {
      x = `0${x}`;
    }
    return x;
  }

  let fileName = `${year}.${month}-${day}.${hours}-${min}-${sec}.log`
  let log = `${method} ${uri} ${timestamp}\n`;

  fs.readdir('./logs', (err, files) => {
      if (err) throw err;

      let fileNameSub = fileName.substring(0,10)
       if(files.length === 0) {
        let fileWriteStream = fs.createWriteStream(`./logs/${fileName}`);

          fs.writeFile(`./logs/${fileName}`, log, function (err) {
            if (err) return console.log(err);
          });
       }

      files.forEach((file) => {
        fileSub = file.substring(0,10);
        if(fileSub !== fileNameSub) {
          let fileWriteStream = fs.createWriteStream(`./logs/${fileName}`);

          fs.writeFile(`./logs/${fileName}`, log, function (err) {
            if (err) return console.log(err);
          });
        } else if(fileSub === fileNameSub) {
          fs.appendFile(`./logs/${file}`, log, function (err) {
            if (err) return console.log(err);
          });
        }
      })
    next();
    });
}

router.route('/new')
    .get((req,res) => {
      res.render('templates/articles/new')
    })

router.route('/')
  .post(analyticsTracker, headerValidation, validateReq, (req,res) => {
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
  .get(analyticsTracker, headerValidation, (req,res) => {
      res.render('templates/articles/index', {
      data:data.all()
    })
  })

router.route('/:title')
  .put(analyticsTracker, headerValidation, (req,res) => {
    let successful = data.editByTitle(req.body.title, req.body)
    if(successful) {
      res.redirect(`/articles/${req.params.title}`) // add 200
    } else if(successful === false) {
      res.redirect(`/articles/${req.params.title}/edit`) // radd 500
    }
  })
  .delete(analyticsTracker,headerValidation, (req,res) => {
    let successful = data.deleteByTitle(req.params.title)
    if(successful) {
      res.redirect('/articles') // add 200
    } else if(successful === false) {
      res.redirect(`/articles/${req.params.title}`) // add 500
    }
  })
  .get(analyticsTracker, headerValidation, (req,res) => {
    if(data.getByTitle(req.params.title) !== undefined) {
      res.render('templates/articles/item', {
        data: data.getByTitle(req.params.title)
      })
    } else {
      res.render(`templates/404`)
    }
})

router.route('/:title/edit')
  .get(analyticsTracker, headerValidation, (req,res) => {
    if(data.getByTitle(req.params.title) !== undefined) {
      res.render('templates/articles/edit', {
        data: data.getByTitle(req.params.title)
      })
    } else {
      res.render(`templates/404`)
    }
  })

module.exports = router;