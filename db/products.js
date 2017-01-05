 module.exports = (function() {

  let _data = [];

  function _all() {
    return _data;
  }

  function _add(obj) {
    _data.push(obj)
  }

  function _getById(id) {
    let toReturn;
    _data.forEach((x) => {
      if(x.id.toString() === id) {
        toReturn = x;
      }
    })
    return toReturn
  }

  function _editById(id, toEdit) {
    let objToEdit = _getById(id);
    let successful;
    if(objToEdit !== undefined) {
      if(toEdit.hasOwnProperty('name')) {
        objToEdit.name = toEdit.name;
        successful = true;
      } else if(toEdit.hasOwnProperty('price')) {
        objToEdit.price = toEdit.price;
        successful = true
      } else if(toEdit.hasOwnProperty('inventory')) {
        objToEdit.inventory = toEdit.inventory;
        successful = true;
      } else {
        successful = false;
      }
    } else {
      successful = false;
    }
    return successful
  }

  function _deleteById(id) {
    let toDelete = _getById(id);
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
    getById: _getById,
    editById: _editById,
    deleteById: _deleteById
  }

 })();