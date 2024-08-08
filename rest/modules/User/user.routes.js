const router = require('express').Router();
const userService = require('./user.service');

router.get('/:id', (req, res) => {
  userService.readUser(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'User not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.put('/:id', (req, res) => {
  userService.updateUser(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'User not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.delete('/:id', (req, res) => {
  userService.deleteUser(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'User not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.post('/', (req, res) => {
  userService.createUser(req.body, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
