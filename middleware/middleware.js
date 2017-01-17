const fs = require('fs')
const express = require('express');

module.exports = (function() {

  const headerValidation = (req,res,next) => {
    if(req.httpVersion === '1.1') {
      next();
    } else {
      res.send({error: 'bad headers'})
    }
  }

  const analyticsTracker = (req, res, next) => {
    let method = req.method;
    let uri = req.originalUrl;
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
        // if (err) throw err;

        // let fileNameSub = fileName.substring(0,10)
        //  if(files.length === 0) {
        //   let fileWriteStream = fs.createWriteStream(`./logs/${fileName}`);

        //     fs.writeFile(`./logs/${fileName}`, log, function (err) {
        //       if (err) return console.log(err);
        //     });
        //  }

        // files.forEach((file) => {
        //   fileSub = file.substring(0,10);
        //   if(fileSub !== fileNameSub) {
        //     let fileWriteStream = fs.createWriteStream(`./logs/${fileName}`);

        //     fs.writeFile(`./logs/${fileName}`, log, function (err) {
        //       if (err) return console.log(err);
        //     });
        //   } else if(fileSub === fileNameSub) {
        //     fs.appendFile(`./logs/${file}`, log, function (err) {
        //       if (err) return console.log(err);
        //     });
        //   }
        // })
      next();
      });
  }

  return {
    headerValidation,
    analyticsTracker,
  }

})();