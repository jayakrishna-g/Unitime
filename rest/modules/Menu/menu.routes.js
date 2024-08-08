const router = require('express').Router();
const menuService = require('./menu.service');
const middleware = require('../../core/middleware/middleware');

router.get('/all', middleware.verifyToken, (req, res) => {
  menuService.getAll(req.user, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  menuService.readMenu(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Menu not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.all('*', middleware.verifyToken);

router.post('/', (req, res) => {
  menuService.createMenu(req.user, req.body, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.all('*', middleware.verifyOwner('user'));

router.put('/:id', (req, res) => {
  menuService.updateMenu(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Menu not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.delete('/:id', (req, res) => {
  console.log('delete');
  menuService.deleteMenu(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Menu not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
