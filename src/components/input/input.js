import React, {useState, useRef} from "react";
import visible from '../../img/visible.png'
import invisible from '../../img/invisible.png'

const Input = (props) => {
    const [passwordVisible, setPasswordVisible] = useState('password')

    const input = useRef(null)

    const togglePassword = () => {
        let newType = ''
        if (passwordVisible === 'password') {
            newType = 'text'
        } else {
            newType = 'password'
        }
        setPasswordVisible(newType)
    }

    return (
        <div className={'input-wrap'}>
            <input
                id={props.id}
                placeholder={props.placeholder}
                type={props.type === 'password' ? passwordVisible : ''}
                className={`${props.className ? props.className : ''} input-component`}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                onFocus={e => e.target.focus()}
                ref={props.ref}
            />
            {
                props.type === 'password' && <img
                                                src={passwordVisible === 'password' ? invisible : visible}
                                                alt={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                                                onClick={togglePassword}
                                            />
            }
        </div>
    )
}

export default Input