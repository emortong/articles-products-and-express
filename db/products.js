const db = require('../requirements/requirements.js');

 module.exports = (function() {

  function _all() {
    return db.query('SELECT * FROM products')
  }

  function _add(obj) {
    return db.query('INSERT INTO products (name, price, inventory) values($1, $2, $3)',
      [obj.name, obj.price, obj.inventory])
  }

  function _getById(id) {
    return db.query('SELECT * FROM products WHERE id = $1', [id]);
  }

  function _editById(toEdit) {
    return db.query('UPDATE products SET name = $2, price = $3, inventory = $4 WHERE id = $1',
      [toEdit.id, toEdit.name, toEdit.price, toEdit.inventory])
  }

  function _deleteById(id) {
    return db.query('DELETE FROM products WHERE id = $1', [id]);
  }

  return {
    all: _all,
    add: _add,
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  }

 })();