// import all functions to be used in app.js
const { view, add, update, remove, dropConnection,  } = require('./index.js');
const { addEmployee, addRole,  addDepartment } = require('./addFunctions.js');

// export all functions as an object
module.exports = {
  view,
  add,
  dropConnection,
  update,
  remove,
  addRole,
  addDepartment,
  addEmployee,
};
