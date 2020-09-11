let totais = {
    lancamentos: 0,
    receitas: 0,
    despesas: 0,
    saldo: 0
}

const calcular = (transacoes) => {

    if (transacoes && transacoes !== null && transacoes.length > 0) {

        for (let i = 0; i < transacoes.length; i++) {
            if (transacoes[i].type === '+') {
                totais.receitas += transacoes[i].value;
            } else {
                totais.despesas += transacoes[i].value;
            }
        }

        totais.lancamentos = transacoes.length;
        totais.saldo = totais.receitas - totais.despesas;
    }

    return totais;
}

export {
    calcular
}