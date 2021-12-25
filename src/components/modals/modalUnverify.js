import React from 'react';
import Button from "../button/button";
import {sendVerifycateCode} from "../common/api";
import translation from "../common/translation.json"
import {useSelector} from "react-redux";

const ModalUnverify = ({close}) => {

    const lang = useSelector(state => state.app.language)

    const sendConfirmEmail = async () => {
        await sendVerifycateCode()
        close()
    }

    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal email-modal" onClick={e => e.stopPropagation()}>
                <h1>{translation.modals.unverify.email_is_dont_verifyed[lang]}</h1>
                <p>{translation.modals.unverify.confirm_email[lang]}</p>
                <Button action={sendConfirmEmail}>{translation.modals.unverify.send_confirm[lang]}</Button>
            </div>
        </div>
    );
};

export default ModalUnverify;