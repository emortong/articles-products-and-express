const express = require('express');
const exphbs = require('express-handlebars')
const articles = require('./routes/articles');
const products = require('./routes/products');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.engine('.hbs', exphbs({
  extname:'.hbs',
  defaultLayout:'main',
}))

app.use('/products', products);
app.use('/articles', articles)



if(!module.parent) {
  app.listen(4000, () => {
    console.log('Server started on port 4000')
  });
}

module.exports = app;