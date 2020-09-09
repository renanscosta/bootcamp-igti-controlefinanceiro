const mongoose = require('mongoose');
const utils = require('../helpers/utils');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
    const period = req.query.period;
    try {
        if (!period || period === null || typeof (period) === "undefined")
            throw new Error("É necessário informar o período para busca.");

        //condicao para o filtro no findAll
        var condition = period
            ? { yearMonth: { $regex: period, $options: 'i' } }
            : {};

        const transaction = await TransactionModel.find(condition);
        res.send(transaction);

    } catch (error) {
        res
            .status(500)
            .send({ message: error.message });
    }
};

const findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const transaction = await TransactionModel.findById({ _id: id });
        if (!transaction) {
            res.status(404).send({ message: 'transação não encontrado' });
        } else {

            res.send(transaction);
        }


    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar o transação id: ' + id });
    }
};

const create = async (req, res) => {
    try {
        let transaction = req.body;
        const logs = utils.validate(transaction);

        if (logs.length > 0) {
            res.status(412)
                .send({
                    error: "Verifique as inconsistências abaixo.",
                    logs: logs
                });
        }

        transaction = new TransactionModel(utils.fillDates(transaction));

        const entity = await transaction.save();
        res.status(201)
            .send(entity);


    } catch (error) {
        res
            .status(500)
            .send({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        let transaction = req.body;
        const logs = utils.validate(transaction);
        const id = req.params.id

        if (logs.length > 0) {
            res.status(412)
                .send({
                    error: "Verifique as inconsistências abaixo.",
                    logs: logs
                });
        }

        transaction = utils.fillDates(transaction);

        const entity = await TransactionModel.findByIdAndUpdate({ _id: id }, transaction, { new: true });
        res.status(200)
            .send(entity);

    } catch (error) {
        res
            .status(500)
            .send({ message: error.message });
    }
}

const remove = async (req, res) => {

    try {

        const transaction = await TransactionModel.findByIdAndDelete({ _id: req.params.id });

        if (!transaction) { res.status(404).send({ message: 'Nenhuma transação encontrada com o identificador informado.' }) }

        res.status(200).send();

    } catch (error) {
        res
            .status(500)
            .send({ message: error.message });
    }
}


module.exports = { findAll, findOne, create, update, remove };