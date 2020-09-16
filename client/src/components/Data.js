import React, { useEffect, useState } from 'react'
import * as utils from '../helper/utils';

export default function Data({ carregarPeriodo }) {

    const [datas, setDatas] = useState([]);
    const [periodoSelecionado, setPeriodoSelecionado] = useState('--');

    const onChangePeriodoConsulta = (event) => {
        carregarPeriodo(event.target.value);
        setPeriodoSelecionado(event.target.value);
    }

    useEffect(() => {
        setDatas(utils.gerarDatas());
    }, []);


    const { flexRowStyle, selectStyle } = styles;
    return (
        <div className='center' style={flexRowStyle}>
            <button>&lt;</button>
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
            <button>&gt;</button>
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
