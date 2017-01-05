const express = require('express');
const exphbs = require('express-handlebars')
const articles = require('./routes/articles');
const products = require('./routes/products');
const bodyParser = require('body-parser');
var methodOverride = require('method-override')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.set('view engine', '.hbs');

app.engine('.hbs', exphbs({
  extname:'.hbs',
}))

app.use('/products', products);
app.use('/articles', articles)



if(!module.parent) {
  app.listen(4000, () => {
    console.log('Server started on port 4000')
  });
}

module.exports = app;