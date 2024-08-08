const datamodel = require('../../core/dbLib/data.service');
const Product = require('./instructor.model');
const utils = require('../../core/utils/utils');

const getEmptyProduct = () => utils.clone(require('./EmptyProduct.json'));

module.exports.readProduct = (id, cb) => {
  datamodel.getSingleDataByQuery({ externalId: id }, Product, cb);
};
module.exports.updateProduct = (id, data, cb) => {
  datamodel.updateOneById(id, data, Product, cb);
};

module.exports.createProduct = (user, newProduct, cb) => {
  if (newProduct.empty) {
    newProduct = getEmptyProduct();
  }
  console.log(newProduct);
  if (!user) {
    cb(new Error('Empty Product Sent for Creation'), null);
    return;
  }
  newProduct.user = user._id;
  const tProduct = new Product(newProduct);
  tProduct.save((err) => {
    if (err) console.log(`ERROR CREATING Product ${err}`);
    cb(err, tProduct);
  });
};

module.exports.deleteProduct = (id, cb) => {
  datamodel.deleteData(id, Product, cb);
};

module.exports.getAll = (user, cb) => {
  datamodel.getDataByQuery({}, Product, cb);
};
