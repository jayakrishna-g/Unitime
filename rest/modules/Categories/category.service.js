const datamodel = require('../../core/dbLib/data.service');
const Category = require('./category.model');
const utils = require('../../core/utils/utils');

const getEmptyCategory = () => utils.clone(require('./EmptyCategory.json'));

const populateJson = {
  path: 'products',
};

module.exports.readCategory = (id, cb) => {
  datamodel.getDataByIdAndPopulate(Category, id, populateJson, cb);
};
module.exports.updateCategory = (id, data, cb) => {
  datamodel.updateOneById(id, data, Category, cb);
};

module.exports.createCategory = (user, newCategory, cb) => {
  if (newCategory.empty) {
    newCategory = getEmptyCategory();
  }
  if (!user) {
    cb(new Error('Empty User Sent for Category Creation'), null);
    return;
  }
  newCategory.user = user._id;
  const tCategory = new Category(newCategory);
  tCategory.save((err) => {
    if (err) console.log(`ERROR CREATING Category ${err}`);
    cb(err, tCategory);
  });
};

module.exports.deleteCategory = (id, cb) => {
  datamodel.deleteData(id, Category, cb);
};

module.exports.getAll = (user, cb) => {
  datamodel.getDataWithQueryAndPopulate(
    Category,
    { user: user._id },
    populateJson,
    cb
  );
};
