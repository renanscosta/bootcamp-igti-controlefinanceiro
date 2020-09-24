import React from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');
export default function ModalTransaction() {
    // const title =
    //     mode === 'insert' ? 'Inclusão de lançamento' : 'Edição de lançamento';

    const {
        headerStyle,
        modalStyle,
        formStyle,
        radioStyle,
        radioButtonStyle,
        earningExpenseStyle,
    } = styles;
    return (
        <Modal style={modalStyle}>

            <div>
                oi
        </div>
        </Modal>
    )
}

const styles = {
    modalStyle: {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    },

    headerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    formStyle: {
        border: '1px solid lightgrey',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '10px',
    },

    radioStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
    },

    radioButtonStyle: {
        marginRight: '10px',
        marginLeft: '10px',
        padding: '20px',
    },

    earningExpenseStyle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
};