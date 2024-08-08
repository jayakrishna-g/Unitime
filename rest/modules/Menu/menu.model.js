const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  categories: [
    {
      cname: String,
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Menu', menuSchema);

// UserSchema.post('find', function (res, next) {
//   this.find({ deleted: { ne: false } })
//     .then(() => next())
//     .error((err) => next(err));
// });
