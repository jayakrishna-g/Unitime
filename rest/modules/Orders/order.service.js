const datamodel = require('../../core/dbLib/data.service');
const Order = require('./order.model');

module.exports.readOrder = (id, cb) => {
  datamodel.getDataById(id, Order, cb);
};
module.exports.updateOrder = (id, data, cb) => {
  datamodel.updateOneById(id, data, Order, cb);
};

module.exports.createOrder = (user, newOrder, cb) => {
  if (!newOrder || !user) {
    cb(new Error('Empty Order Sent for Creation'), null);
    return;
  }
  newOrder.user = user._id;
  const tOrder = new Order(newOrder);
  tOrder.save((err) => {
    if (err) console.log(`ERROR CREATING Order ${err}`);
    cb(err, tOrder);
  });
};

module.exports.deleteOrder = (id, cb) => {
  datamodel.deleteData(id, Order, cb);
};

module.exports.getAll = (user, cb) => {
  datamodel.getDataByQuery({ user: user._id }, Order, cb);
};
