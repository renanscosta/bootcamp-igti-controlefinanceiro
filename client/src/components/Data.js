import React, { useEffect, useState } from 'react'
import * as utils from '../helper/utils';
import * as api from '../api/apiService';

export default function Data({ carregarTransacoes }) {

    const [datas, setDatas] = useState([]);
    const [periodoConsulta, setPeriodoConsulta] = useState('2019-01');
    const [transacoes, setTransacoes] = useState([]);

    const ObterPeriodoConsulta = (event) => {
        setPeriodoConsulta(event.target.value);
    }

    useEffect(() => {
        const obterTransacoes = async () => {
            const dados = await api.getAllTransactions(periodoConsulta);
            setTransacoes(dados);
            carregarTransacoes(dados);
        }

        obterTransacoes();
    }, [periodoConsulta]);

    useEffect(() => {
        setDatas(utils.gerarDatas());
    }, []);

    return (
        <div>
            <button>&lt;</button>
            <select className='browser-default'
                style={{ display: 'inline' }}
                onChange={ObterPeriodoConsulta}>
                {
                    datas.map((data) => {
                        const { valor, display } = data
                        return (
                            <option key={valor} value={valor}>{display}</option>
                        )
                    })
                }
            </select>
            <button>&gt;</button>
        </div >
    )
}
