import React, { useEffect, useState } from 'react'
import * as utils from '../helper/utils';
import ArrowButton from './ArrowButton';

export default function Data({ carregarPeriodo }) {

    const [datas, setDatas] = useState([]);
    const [periodoSelecionado, setPeriodoSelecionado] = useState('--');

    const onChangePeriodoConsulta = (event) => {
        carregarPeriodo(event.target.value);
        setPeriodoSelecionado(event.target.value);
    }

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
        setDatas(utils.gerarDatas());
    }, []);


    const { flexRowStyle, selectStyle } = styles;
    return (
        <div className='center' style={flexRowStyle}>

            <ArrowButton type='left' handleButtonClick={onClickLeft} />
            <select className='browser-default'
                style={selectStyle}
                value={periodoSelecionado}
                onChange={onChangePeriodoConsulta}>
                {
                    datas.map((data) => {
                        const { valor, display } = data
                        return (
                            <option key={valor} value={valor}>{display}</option>
                        )
                    })
                }
            </select>
            <ArrowButton type='right' handleButtonClick={onClickRight} />
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
