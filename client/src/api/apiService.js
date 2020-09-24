import axios from 'axios';

const URL = 'http://localhost:3001/api/transaction'

const getAllTransactions = async (periodo) => {

    try {

        const response = await axios.get(`${URL}?period=${periodo}`);
        console.log(`${URL}?period=${periodo}`);
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

export { getAllTransactions, deleteTransaction }