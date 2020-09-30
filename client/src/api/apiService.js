import axios from 'axios';

const URL = 'http://localhost:3001/api/transaction'


function getCompleteTransaction(transaction) {
    const { yearMonthDay } = transaction;
    const year = +yearMonthDay.substring(0, 4);
    const month = +yearMonthDay.substring(5, 7);
    const day = +yearMonthDay.substring(8, 10);

    const completeTransaction = {
        ...transaction,
        year,
        month,
        day,
    };

    return completeTransaction;
}

const getAllTransactions = async (periodo) => {

    try {

        const response = await axios.get(`${URL}?period=${periodo}`);
        return response.data;
    }
    catch (error) {
        return null;
    }
}

const deleteTransaction = async (id) => {
    try {
        await axios.delete(`${URL}/${id}`);
        return;

    } catch (error) {
        return null;
    }
}

const postTransaction = async (transaction) => {
    try {
        const transacaoFormatada = getCompleteTransaction(transaction);
        const newTransaction = await axios.post(`${URL}/`, transacaoFormatada);
        return newTransaction.data;

    } catch (error) {
        console.log(error.message);
        return null;
    }
}

async function updateTransaction(transaction) {

    try {
        const transacaoFormatada = getCompleteTransaction(transaction);
        console.log(transacaoFormatada);
        const transactionUpdate = await axios.put(`${URL}/${transaction._id}`, transacaoFormatada);
        return transactionUpdate.data;
    }
    catch (err) {
        return null;
    }
}

export { getAllTransactions, deleteTransaction, postTransaction, updateTransaction }