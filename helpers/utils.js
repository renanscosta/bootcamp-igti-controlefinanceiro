function validate(transaction) {

    const log = [];
    if (!transaction || transaction === null || typeof (transaction) === 'undefined') {
        throw new Error("É necessário informar todos os campos da transação.");
    } else if (!hasInformation(transaction.description)) {
        log.push('Informe uma descrição para a transação');
    } else if (!hasInformation(transaction.category)) {
        log.push('Informe uma categoria para a transação');
    } else if (!hasInformation(transaction.yearMonthDay)) {
        log.push('Informe uma data para a transação');
    } else if (!hasInformation(transaction.type)) {
        log.push('Informe um tipo para a transação');
    } else if (!hasValue(transaction.value)) {
        log.push('Informe um valor para a transação');
    }

    return log;
}

function hasInformation(data) {
    if (!data || data === null || typeof (data) === 'undefined') {
        return false;
    }

    return true;
}

function hasValue(value) {
    if (!hasInformation(value) || value <= 0) {
        return false;
    }

    return true;
}

const fillDates = (transaction) => {

    const date = new Date(transaction.yearMonthDay);

    transaction.year = date.getFullYear();
    transaction.month = date.getMonth();
    transaction.day = date.getDay();
    transaction.yearMonth = date.toISOString().slice(0, 7);
    transaction.yearMonthDay = date.toISOString().slice(0, 10);

    return transaction;
}

module.exports = { fillDates, validate }