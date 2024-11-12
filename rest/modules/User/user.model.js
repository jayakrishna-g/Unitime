/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const GenricPrefSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});
const SemesterPreferenceSchema = new mongoose.Schema({
  preferenceTime: {
    type: String,
    required: true,
  },
  roomDistribution: {
    type: [GenricPrefSchema],
    required: true,
  },
  course: {
    type: [GenricPrefSchema],
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  externalId: String,
  position: String,
  role: String,
  department: String,
  semesterPreference: {
    type: Map,
    of: SemesterPreferenceSchema,
  },
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
