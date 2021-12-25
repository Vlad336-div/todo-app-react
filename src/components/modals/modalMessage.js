import React from 'react';

const ModalMessage = ({title, description, close}) => {
    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ModalMessage;