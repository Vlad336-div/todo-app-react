import React, {useState} from 'react';
import Input from "../input/input";
import Button from "../button/button";
import {useSelector} from "react-redux";
import {updatePassFirebase} from "../common/api";
import {validate} from "../common/validate";
import translation from "../common/translation.json"

const ModalUpdatePass = ({close}) => {
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [repeatNewPass, setRepeatNewPass] = useState('')

    const user = useSelector(state => state.user.user)
    const lang = useSelector(state => state.app.language)

    const updatePass = async () => {
        const form = [
            {
                value: oldPass,
                type: 'password'
            },
            {
                value: newPass,
                type: 'password'
            },
            {
                value: repeatNewPass,
                type: 'repeatPass',
                repeatPass: newPass
            }
        ]
        const {is_valid, items} = validate(form)
        const response = await updatePassFirebase(user.email, oldPass, newPass)
        if (!response) return
        close()
    }

    return (
        <div className='modal-wrap' onClick={close}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1>{translation.modals.update_pass.update_pass[lang]}</h1>
                <Input
                    type='password'
                    value={oldPass}
                    onChange={setOldPass}
                    placeholder={translation.modals.update_pass.old_pass[lang]}
                />
                <Input
                    type='password'
                    value={newPass}
                    onChange={setNewPass}
                    placeholder={translation.modals.update_pass.new_pass[lang]}
                />
                <Input
                    type='password'
                    value={repeatNewPass}
                    onChange={setRepeatNewPass}
                    placeholder={translation.modals.update_pass.repeat_new_pass[lang]}
                />
                <Button action={updatePass}>{translation.modals.update_pass.update[lang]}</Button>
            </div>
        </div>
    );
};

export default ModalUpdatePass;