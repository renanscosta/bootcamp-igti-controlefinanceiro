import React from 'react'
import { formatNumber } from '../helper/utils';

const EARNING_COLOR = '#16a085';
const EXPENSE_COLOR = '#c0392b';

export default function Summary({ somatorio }) {
    const { lancamentos, receitas, despesas, saldo } = somatorio;
    const { containerStyle, earningStyle, expenseStyle } = styles;

    return (
        <div style={containerStyle}>
            <strong>
                Lançamentos:{' '}
                <span>{lancamentos}</span>
            </strong>
            <strong>
                Receitas:{' '}
                <span style={earningStyle}>{formatNumber(receitas)}</span>
            </strong>
            <strong>
                Despesas:{' '}
                <span style={expenseStyle}>{formatNumber(despesas)}</span>
            </strong>
            <strong>
                Saldo:
                <span>{formatNumber(saldo)}</span>
            </strong>
        </div>
    )
}

const styles = {
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '5px',
        margin: '10px',
        border: '1px solid lightgrey',
        borderRadius: '4px',
    },

    earningStyle: {
        color: EARNING_COLOR,
    },

    expenseStyle: {
        color: EXPENSE_COLOR,
    },
};
