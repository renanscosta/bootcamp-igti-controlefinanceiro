import React, { useEffect, useState } from 'react'
import * as utils from '../helper/utils';
import ArrowButton from './ArrowButton';

export default function Data({ carregarPeriodo, peridoAnterior }) {

    const [datas, setDatas] = useState([]);
    const [periodoSelecionado, setPeriodoSelecionado] = useState('--');
    const [ehPrimeiroPeriodo, setEhPrimeiroPeriodo] = useState(false);
    const [ehUltimoPeriodo, setEhUltimoPeriodo] = useState(false);

    const onChangePeriodoConsulta = (event) => {
        carregarPeriodo(event.target.value);
        setPeriodoSelecionado(event.target.value);
    }

    const marcarPrimeiroPeriodo = (index) => index === 0;
    const marcarUltimoPeriodo = (index) => datas.length - 1 === index;

    const onClickRight = () => {
        const index = datas.findIndex((data) => data.valor === periodoSelecionado);

        if (index >= 0) {

            const periodo = datas[index + 1].valor;

            carregarPeriodo(periodo);
            setPeriodoSelecionado(periodo);
        }
    }

    const onClickLeft = () => {
        const index = datas.findIndex((data) => data.valor === periodoSelecionado);
        if (index >= 0) {

            const periodo = datas[index - 1].valor;

            carregarPeriodo(periodo);
            setPeriodoSelecionado(periodo);
        }
    }

    useEffect(() => {
        setPeriodoSelecionado(peridoAnterior);
        setDatas(utils.gerarDatas());
        setEhPrimeiroPeriodo(true);

    }, []);

    useEffect(() => {

        if (datas.length > 0) {
            const index = datas.findIndex((data) => data.valor === periodoSelecionado);

            if (index < 0) {
                setPeriodoSelecionado(true);
            } else {

                setEhPrimeiroPeriodo(marcarPrimeiroPeriodo(index));
                setEhUltimoPeriodo(marcarUltimoPeriodo(index));
            }

        }

    }, [periodoSelecionado]);

    const { flexRowStyle, selectStyle } = styles;
    return (
        <div className='center' style={flexRowStyle}>

            <ArrowButton type='left' handleButtonClick={onClickLeft} buttonDisabled={ehPrimeiroPeriodo} />
            <select className='browser-default'
                style={selectStyle}
                value={periodoSelecionado}
                onChange={onChangePeriodoConsulta}>
                {
                    datas.map((data, chave) => {
                        const { valor, display } = data
                        return (
                            <option key={chave} value={valor}>{display}</option>
                        )
                    })
                }
            </select>
            <ArrowButton type='right' handleButtonClick={onClickRight} buttonDisabled={ehUltimoPeriodo} />
        </div >
    )
}

const styles = {
    flexRowStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
    },

    selectStyle: {
        width: '200px',
        fontFamily: "'Fira Code Retina', Consolas, monospace, Arial",
    },
};
