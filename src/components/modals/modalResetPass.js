import React, {useState} from 'react';
import Input from "../input/input";
import Button from "../button/button";
import {useSelector} from "react-redux";
import {validate} from "../common/validate";
import {sendEmailResetPass} from "../common/api";
import translation from "../common/translation.json"

const ModalResetPass = ({close}) => {
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')

    const lang = useSelector(state => state.app.language)

    const sendEmail = async () => {
        const form = [
            {
                type: 'email',
                value: email
            }
        ]
        const {is_valid, items} = validate(form)
        items.forEach(item => {
            const type = item.type[0].toUpperCase()+item.type.slice(1)
            eval('setError'+type)(!item.valid)
        })
        if (!is_valid) return
        await sendEmailResetPass(email)
        close()
    }

    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal-reset-pass modal" onClick={e => e.stopPropagation()}>
                <h1>{translation.modals.reset_pass.reset_pass[lang]}</h1>
                <p>{translation.modals.reset_pass.enter_email[lang]}</p>
                <div className='input-wrap'>
                    <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={setEmail}
                        placeholder={translation.modals.reset_pass.input_email[lang]}
                        className={errorEmail ? 'border-error' : ''}
                    />
                    {
                        errorEmail && <label className='error-input' htmlFor="email">Incorrect email</label>
                    }
                </div>
                <Button action={sendEmail}>{translation.modals.reset_pass.send[lang]}</Button>
            </div>
        </div>
    );
};

export default ModalResetPass;