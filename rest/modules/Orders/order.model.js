const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  time: Date,
  metaData: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Order', orderSchema);

// UserSchema.post('find', function (res, next) {
//   this.find({ deleted: { ne: false } })
//     .then(() => next())
//     .error((err) => next(err));
// });
