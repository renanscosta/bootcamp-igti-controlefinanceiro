import React from 'react'

export default function Actions({ handleFilter, filterText, onNewTransaction }) {

    const handleTextFilter = (event) => {
        console.log(event.target.value)
        handleFilter(event.target.value);
    }

    const handleButtonClick = () => {
        onNewTransaction();
    };

    const { containerStyle, inputStyle } = styles;
    return (
        <div style={containerStyle}>
            <button className='waves-effect waves-light btn'
                disabled={filterText.trim() !== ''}
                onClick={handleButtonClick}>
                + Novo Lançamento
            </button>
            <div className='input-field' style={inputStyle}>
                <input type='text' placeholder="filtro" onChange={handleTextFilter}></input>
            </div>
        </div>
    )
}

const styles = {
    containerStyle: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    inputStyle: {
        marginLeft: '10px',
        display: 'flex',
        flex: 1,
    },
};
