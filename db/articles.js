const db = require('../requirements/requirements.js');

module.exports = (function() {

  function _all() {
    return db.query('SELECT * FROM articles')
  }

  function _add(obj) {
    return db.query('INSERT INTO articles (title, body, author, urlTitle) values($1, $2, $3, $4)',
      [obj.title, obj.body, obj.author, obj.urlTitle])
  }

  function _getByTitle(title) {
    return db.query('SELECT * FROM articles WHERE title = $1', [title]);
  }

  function _editByTitle(toEdit) {
    console.log(toEdit);
    return db.query('UPDATE articles SET title = $1, body = $2, author = $3 WHERE title = $4',
      [toEdit.title, toEdit.body, toEdit.author, toEdit.title])
  }

  function _deleteByTitle(title) {
    return db.query('DELETE FROM articles WHERE title = $1', [title]);
  }

  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle,
  }

})();