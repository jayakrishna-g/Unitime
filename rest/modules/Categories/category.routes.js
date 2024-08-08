const router = require('express').Router();
const categoryService = require('./category.service');
const middleware = require('../../core/middleware/middleware');

router.get('/all', middleware.verifyToken, (req, res) => {
  categoryService.getAll(req.user, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  categoryService.readCategory(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Category not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.all('*', middleware.verifyToken);

router.post('/', (req, res) => {
  categoryService.createCategory(req.user, req.body, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.all('*', middleware.verifyOwner('user'));

router.put('/:id', (req, res) => {
  categoryService.updateCategory(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Category not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.delete('/:id', (req, res) => {
  categoryService.deleteCategory(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Category not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
