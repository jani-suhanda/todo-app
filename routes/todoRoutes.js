const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/todoController');

router.get('/todos', ctrl.getAll);
router.get('/todos/:id', ctrl.getOne);
router.post('/todos', ctrl.create);
router.put('/todos/:id', ctrl.update);
router.delete('/todos/:id', ctrl.remove);

module.exports = router;
