import React from 'react'

export default function ArrowButton({ type, handleButtonClick }) {
    return (
        <button
            className='waves-effect waves-light btn'
            style={{
                marginLeft: '5px',
                marginRight: '5px',
                fontWeight: 'bold',
            }}
            onClick={handleButtonClick}>
            {type === 'left' ? '<' : '>'}
        </button>
    )
}
