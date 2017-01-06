const express = require('express');
const router = express.Router();
const data = require('../db/products.js');
const fs = require('fs')

let numId = 0;

const validateReq = (req,res,next) => {
  let x = req.body;
  if(typeof x.name === 'string' && typeof x.price === 'string' && typeof x.inventory === 'string') {
    next();
  } else {
    res.status(500).redirect('/products/new')
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
  let uri = `/products${req.url}`
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
    .get(analyticsTracker,(req,res) => {
      res.render('templates/products/new')
    })

router.route('/')
  .post(analyticsTracker, headerValidation, validateReq, (req,res) => {
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
  .get(analyticsTracker,headerValidation,  (req,res) => {
    res.render('templates/products/index', {
      data:data.all()
    })
  })

router.route('/:id')
  .put(analyticsTracker, headerValidation, (req,res) => {
    let successful = data.editById(req.body.id, req.body)
    if(successful) {
      res.redirect(`/products/${req.params.id}`) //add a 200
    } else if(successful === false) {
      res.redirect(`/products/${req.params.id}/edit`) // add a 500 status
    }
  })
  .delete(analyticsTracker, headerValidation, (req,res) => {
    let successful = data.deleteById(req.params.id)
    if(successful) {
      res.redirect('/products') // add a 200
    } else if(successful === false) {
      res.redirect(`/products/new`) // add a 500
    }
  })
  .get(analyticsTracker, headerValidation, (req,res) => {
    if(data.getById(req.params.id) !== undefined) {
      res.render('templates/products/item', {
        data: data.getById(req.params.id)
      })
    } else {
      res.render(`templates/404`)
    }
  })

router.route('/:id/edit')
  .get(analyticsTracker, headerValidation, (req,res) => {
    if(data.getById(req.params.id) !== undefined) {
      res.render('templates/products/edit', {
        data: data.getById(req.params.id)
      })
    } else {
      res.render(`templates/404`)
    }
  })

module.exports = router;


