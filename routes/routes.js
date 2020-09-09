const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService');

transactionRouter.get('/', service.findAll);
transactionRouter.get('/:id', service.findOne);
transactionRouter.post('/', service.create);
transactionRouter.put('/:id', service.update);
transactionRouter.delete('/:id', service.remove);

module.exports = transactionRouter;
