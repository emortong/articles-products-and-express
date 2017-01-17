const Promise = require('bluebird');
const options = {
    promiseLib: Promise
  }
const pgp = require('pg-promise')(options);

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'artsandprods',
  user: 'estefaniamorton',
  password: null
}

const db = pgp(cn);

module.exports = db;