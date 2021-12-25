import React, {useState} from 'react';
import Input from "../input/input";
import Button from "../button/button";
import {updateEmailFirebase} from "../common/api";
import {validate} from "../common/validate";
import translation from "../common/translation.json"
import {useSelector} from "react-redux";

const ModalUpdateEmail = ({close, showMessage}) => {
    const lang = useSelector(state => state.app.language)

    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)

    const updateEmail = async () => {
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
        const response = await updateEmailFirebase(email)
        if (response === 'error') return
        close()
        showMessage()
    }

    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1>{translation.modals.edit_email.edit_email[lang]}</h1>
                <div className='input-wrap'>
                    <Input
                        className={errorEmail ? 'border-error' : ''}
                        id='email'
                        value={email}
                        onChange={setEmail}
                        placeholder={translation.modals.edit_email.input_email[lang]}
                    />
                    {
                        errorEmail && <label className='error-input' htmlFor="email">Incorrect email</label>
                    }
                </div>
                <Button action={updateEmail}>{translation.modals.edit_email.edit[lang]}</Button>
            </div>
        </div>
    );
};

export default ModalUpdateEmail;