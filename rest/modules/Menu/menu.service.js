const datamodel = require('../../core/dbLib/data.service');
const Menu = require('./menu.model');
const utils = require('../../core/utils/utils');

const getEmptyMenu = () => utils.clone(require('./EmptyMenu.json'));

const populateJson = {
  path: 'categories',
  populate: { path: 'products', model: 'Product' },
};

module.exports.readMenu = (id, cb) => {
  datamodel.getDataByIdAndPopulate(Menu, id, populateJson, cb);
};
module.exports.updateMenu = (id, data, cb) => {
  datamodel.updateOneById(id, data, Menu, cb);
};

module.exports.createMenu = async (user, newMenu, cb) => {
  try {
    if (newMenu.empty) {
      newMenu = getEmptyMenu();
    }

    const menuCount = await Menu.countDocuments();
    if (menuCount) {
      newMenu.name = 'Menu' + menuCount;
    }

    newMenu.user = user._id;
    const tMenu = new Menu(newMenu);
    tMenu.save((err) => {
      if (err) console.log(`ERROR CREATING Menu ${err}`);
      cb(err, tMenu);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteMenu = (id, cb) => {
  datamodel.deleteData(id, Menu, cb);
};

module.exports.getAll = (user, cb) => {
  datamodel.getDataWithQueryAndPopulate(
    Menu,
    { user: user._id },
    populateJson,
    cb
  );
};
