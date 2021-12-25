import React from 'react';
import verify_email from "../../img/verified.png"
import translation from "../common/translation.json"
import {useSelector} from "react-redux";

const ModalVerify = ({close}) => {
    const lang = useSelector(state => state.app.language)

    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal email-modal" onClick={e => e.stopPropagation()}>
                <h1>{translation.modals.verify_email.verify_email[lang]}</h1>
                <img src={verify_email} alt='Верифицирован email'/>
            </div>
        </div>
    );
};

export default ModalVerify;