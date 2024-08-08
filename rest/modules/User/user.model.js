/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  businessName: String,
  email: String,
  password: String,
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  console.log(password, this.password);
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

// UserSchema.post('find', function (res, next) {
//   this.find({ deleted: { ne: false } })
//     .then(() => next())
//     .error((err) => next(err));
// });
