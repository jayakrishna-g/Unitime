const datamodel = require('../../core/dbLib/data.service');
const User = require('./user.model');

module.exports.readUser = (id, cb) => {
  datamodel.getDataById(id, User, cb);
};
module.exports.updateUser = (id, data, cb) => {
  datamodel.updateOneById(id, data, User, cb);
};

module.exports.updateSemPreference = (id, data, cb) => {
  // console.log(data);
  // console.log(typeof id);
  datamodel.getDataById(id, User, (err, user) => {
    console.log(user);
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      const semesterPreference = data.semesterPreference;
      user.semesterPreference.set(
        data.semester,
        semesterPreference[data.semester]
      );
      datamodel.updateOneById(id, user, User, cb);
    }
  });

  // User.findById(, (err, user) => {
  //   if (err) {
  //     cb(err, null);
  //   } else {
  //     const semesterPreference = data.semesterPreference;
  //     user.semesterPreference.set(
  //       data.semester,
  //       semesterPreference[data.semester]
  //     );
  //     user.save((err) => {
  //       if (err) {
  //         cb(err, null);
  //       } else {
  //         cb(null, user);
  //       }
  //     });
  //   }
  // });
};

module.exports.getAllProfessors = (cb) => {
  datamodel.getDataByQuery({}, User, cb);
};

module.exports.createUser = (newUser, cb) => {
  console.log(newUser);
  const tUser = new User(newUser);
  tUser.password = tUser.generateHash(tUser.password);
  tUser.role = '2';
  tUser.save((err) => {
    if (err) console.log(`ERROR CREATING USER ${err}`);
    cb(err, tUser);
  });
};

module.exports.deleteUser = (id, cb) => {
  datamodel.deleteData(id, User, cb);
};
