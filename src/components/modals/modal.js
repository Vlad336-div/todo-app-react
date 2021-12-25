import React from 'react';
import Button from "../button/button";
import {useNavigate} from "react-router-dom";

const Modal = ({close}) => {

    const navigate = useNavigate()

    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1>Verify</h1>
                <p>a letter has been sent to your email. Follow the link in it to verify your account.</p>
                <Button action={() => navigate('/login')}>Login</Button>
            </div>
        </div>
    );
};

export default Modal;