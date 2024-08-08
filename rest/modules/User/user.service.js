const datamodel = require('../../core/dbLib/data.service');
const User = require('./user.model');

module.exports.readUser = (id, cb) => {
  datamodel.getDataById(id, User, cb);
};
module.exports.updateUser = (id, data, cb) => {
  datamodel.updateOneById(id, data, User, cb);
};

module.exports.createUser = (newUser, cb) => {
  console.log(newUser);
  const tUser = new User(newUser);
  tUser.password = tUser.generateHash(tUser.password);
  tUser.save((err) => {
    if (err) console.log(`ERROR CREATING USER ${err}`);
    cb(err, tUser);
  });
};

module.exports.deleteUser = (id, cb) => {
  datamodel.deleteData(id, User, cb);
};
