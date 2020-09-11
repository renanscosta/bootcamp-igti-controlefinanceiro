import axios from 'axios';

const URL = 'http://localhost:3001/api/transaction'

const getAllTransactions = async () => {

    try {

        const response = await axios.get(`${URL}?period=2019-02`);
        console.log(`${URL}?period=2019-02`);
        return response.data;
    }
    catch (error) {
        return null;
    }
}

export { getAllTransactions }