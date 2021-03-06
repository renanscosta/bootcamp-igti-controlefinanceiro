'strict'
let datas = [];

const gerarDatas = () => {
    datas = [];
    //datas.push({ valor: '--', display: '' })
    datas.push({ valor: '2019-01', display: 'Jan/2019' })
    datas.push({ valor: '2019-02', display: 'Fev/2019' })
    datas.push({ valor: '2019-03', display: 'Mar/2019' })
    datas.push({ valor: '2019-04', display: 'Abr/2019' })
    datas.push({ valor: '2019-05', display: 'Mai/2019' })
    datas.push({ valor: '2019-06', display: 'Jun/2019' })
    datas.push({ valor: '2019-07', display: 'Jul/2019' })
    datas.push({ valor: '2019-08', display: 'Ago/2019' })
    datas.push({ valor: '2019-09', display: 'Set/2019' })
    datas.push({ valor: '2019-10', display: 'Out/2019' })
    datas.push({ valor: '2019-11', display: 'Nov/2019' })
    datas.push({ valor: '2019-12', display: 'Dez/2019' })

    datas.push({ valor: '2020-01', display: 'Jan/2020' })
    datas.push({ valor: '2020-02', display: 'Fev/2020' })
    datas.push({ valor: '2020-03', display: 'Mar/2020' })
    datas.push({ valor: '2020-04', display: 'Abr/2020' })
    datas.push({ valor: '2020-05', display: 'Mai/2020' })
    datas.push({ valor: '2020-06', display: 'Jun/2020' })
    datas.push({ valor: '2020-07', display: 'Jul/2020' })
    datas.push({ valor: '2020-08', display: 'Ago/2020' })
    datas.push({ valor: '2020-09', display: 'Set/2020' })
    datas.push({ valor: '2020-10', display: 'Out/2020' })
    datas.push({ valor: '2020-11', display: 'Nov/2020' })
    datas.push({ valor: '2020-12', display: 'Dez/2020' })

    datas.push({ valor: '2021-01', display: 'Jan/2021' })
    datas.push({ valor: '2021-02', display: 'Fev/2021' })
    datas.push({ valor: '2021-03', display: 'Mar/2021' })
    datas.push({ valor: '2021-04', display: 'Abr/2021' })
    datas.push({ valor: '2021-05', display: 'Mai/2021' })
    datas.push({ valor: '2021-06', display: 'Jun/2021' })
    datas.push({ valor: '2021-07', display: 'Jul/2021' })
    datas.push({ valor: '2021-08', display: 'Ago/2021' })
    datas.push({ valor: '2021-09', display: 'Set/2021' })
    datas.push({ valor: '2021-10', display: 'Out/2021' })
    datas.push({ valor: '2021-11', display: 'Nov/2021' })
    datas.push({ valor: '2021-12', display: 'Dez/2021' })

    return datas;
}

const formatNumber = (number) => {

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
}
export {
    gerarDatas, formatNumber
}