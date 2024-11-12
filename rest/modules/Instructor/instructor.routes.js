const router = require('express').Router();
const productService = require('./instructor.service');
const userService = require('../User/user.service');
const middleware = require('../../core/middleware/middleware');

router.get('/all', middleware.verifyToken, (req, res) => {
  userService.getAllProfessors((err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  userService.readUser(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'User not Found' });
    } else {
      let result1 = { ...result._doc };
      delete result1.password;
      res.status(200).send(result1);
    }
  });
});

router.all('*', middleware.verifyToken);

router.post('/', (req, res) => {
  productService.createProduct(req.user, req.body, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  // productService.updateProduct(req.params.id, req.body, (err, result) => {
  //   if (err) {
  //     res.status(404).send({ message: 'Product not Found' });
  //   } else {
  //     res.status(200).send(result);
  //   }
  // });

  userService.updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Product not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.put('/:id/semPreference', (req, res) => {
  userService.updateSemPreference(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'User not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  productService.deleteProduct(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Product not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
