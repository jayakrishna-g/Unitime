const router = require('express').Router();
const orderService = require('./order.service');
const middleware = require('../../core/middleware/middleware');

router.get('/all', middleware.verifyToken, (req, res) => {
  orderService.getAll(req.user, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.get('/:id', (req, res) => {
  orderService.readOrder(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Order not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.all('*', middleware.verifyToken);
router.post('/', (req, res) => {
  orderService.createOrder(req.user, req.body, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Internal Server Error' });
    } else {
      res.status(200).send(result);
    }
  });
});

router.all('*', middleware.verifyOwner('user'));

router.put('/:id', (req, res) => {
  orderService.updateorder(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Order not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});
router.delete('/:id', (req, res) => {
  console.log('delete');
  orderService.deleteOrder(req.params.id, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'Order not Found' });
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
