import React from 'react'
import Transaction from './Transaction';

export default function Transactions({ transactions }) {
    let currentDay = 1;
    return (
        <div className='center' style={styles.transactionsStyle}>
            {(transactions && transactions.length > 0) && (
                transactions.map((item) => {
                    const { _id, day } = item;

                    let differentDay = false;
                    if (day !== currentDay) {
                        differentDay = true;
                        currentDay = day;
                    }

                    return (<Transaction
                        key={_id}
                        transaction={item}
                        differentDay={differentDay}
                    />)
                })
            )
            }
        </div >
    )
}
const styles = {
    transactionsStyle: {
        padding: '5px',
    },
};