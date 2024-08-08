const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Category', categorySchema);

// UserSchema.post('find', function (res, next) {
//   this.find({ deleted: { ne: false } })
//     .then(() => next())
//     .error((err) => next(err));
// });
