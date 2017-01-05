module.exports = (function() {

  let _data = [];

  function _all() {
    return _data
  }

  function _add(obj) {
    _data.push(obj)
  }

  function _getByTitle(title) {
    let toReturn;
    _data.forEach((x) => {
      if(x.title === title) {
        toReturn = x;
      }
    })
    return toReturn
  }

  function _editByTitle(title, toEdit) {
    let objToEdit = _getByTitle(title);
    let successful;
    if(objToEdit !== undefined) {
      if(toEdit.hasOwnProperty('body')) {
        objToEdit.body = toEdit.body;
        successful = true
      } else if(toEdit.hasOwnProperty('author')) {
        objToEdit.author = toEdit.author;
        successful = true;
      } else {
        successful = false;
      }
    } else {
      successful = false;
    }
    return successful
  }

  function _deleteByTitle(title) {
    let toDelete = _getByTitle(title);
    let index = _data.indexOf(toDelete);
    if(index !== -1) {
      _data.splice(index, 1)
      return true;
    } else {
      return false;
    }
  }


  return {
    all: _all,
    add: _add,
    getByTitle: _getByTitle,
    editByTitle: _editByTitle,
    deleteByTitle: _deleteByTitle,
  }

})();