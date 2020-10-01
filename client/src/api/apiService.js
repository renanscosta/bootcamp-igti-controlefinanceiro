import axios from 'axios';

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction'


function getCompleteTransaction(transaction) {
    const { yearMonthDay } = transaction;
    const year = +yearMonthDay.substring(0, 4);
    const month = +yearMonthDay.substring(5, 7);
    const day = +yearMonthDay.substring(8, 10);
    const yearMonth = `${year}-${month}`;

    const completeTransaction = {
        ...transaction,
        year,
        month,
        day,
        yearMonth,
    };

    return completeTransaction;
}

const getAllTransactions = async (periodo) => {

    try {

        const response = await api.get(`${RESOURCE}?period=${periodo}`);
        return response.data;
    }
    catch (error) {
        return null;
    }
}

const deleteTransaction = async (id) => {
    try {
        await api.delete(`${RESOURCE}/${id}`);
        return;

    } catch (error) {
        return null;
    }
}

const postTransaction = async (transaction) => {
    try {
        const transacaoFormatada = getCompleteTransaction(transaction);
        const newTransaction = await api.post(`${RESOURCE}/`, transacaoFormatada);
        return newTransaction.data;

    } catch (error) {
        console.log(error.message);
        return null;
    }
}

async function updateTransaction(transaction) {

    try {
        const transacaoFormatada = getCompleteTransaction(transaction);
        const transactionUpdate = await api.put(`${RESOURCE}/${transaction._id}`, transacaoFormatada);
        return transactionUpdate.data;
    }
    catch (err) {
        return null;
    }
}

export { getAllTransactions, deleteTransaction, postTransaction, updateTransaction }