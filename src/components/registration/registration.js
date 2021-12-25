import React, {useEffect, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import Modal from '../modals/modal'
import {Link} from "react-router-dom";
import {registration} from "../common/api";
import {validate} from "../common/validate";
import {useDispatch, useSelector} from "react-redux";
import translation from "../common/translation.json"
import Selector from "../selector/Selector";
import {changeLanguage} from "../../redux/actions";

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorRepeatPass, setErrorRepeatPass] = useState(false)
    const [language, setLanguage] = useState(false)

    const lang = useSelector(state => state.app.language)
    const dispatch = useDispatch()

    const register = async (e) => {
        e.preventDefault()
        const form = [
            {
                type: 'email',
                value: email
            },
            {
                type: 'password',
                value: password
            },
            {
                type: 'repeatPass',
                value: repeatPassword,
                repeatPass: password
            }
        ]
        const {is_valid, items} = validate(form)
        items.forEach(item => {
            const type = item.type[0].toUpperCase()+item.type.slice(1)
            eval('setError'+type)(!item.valid)
        })
        if (!is_valid) return
        const response = await registration(email, password)
        if (response === 200) {
            setShowModal(true)
            setEmail('')
            setPassword('')
            setRepeatPassword('')
        }
    }

    useEffect(() => {
        document.title = translation.registration.registration[language]
        if (language) {
            dispatch(changeLanguage(language))
        }
    }, [language])

    useEffect(() => {
        setLanguage(lang)
    }, [])

    return (
        <div className='login-wrap'>
            {
                showModal && <Modal close={() => setShowModal(false)} />
            }
            <div className='left-block'>
                <div className={'text'}>
                    <p>todo</p>
                    <p>app.</p>
                </div>
            </div>
            <div className="right-block">
                <form onSubmit={e => register(e)}>
                    <h2>{translation.registration.registration[lang]}</h2>
                    <div className="input-wrap-registration">
                        <Input
                            id='email'
                            type='email'
                            value={email}
                            onChange={setEmail}
                            className={`input-login ${errorEmail ? 'border-error' : ''}`}
                            placeholder={translation.registration.your_email[lang]}
                        />
                        {
                            errorEmail && <label htmlFor="email" className="error-input">{translation.errors.incorrect_email[lang]}</label>
                        }
                    </div>
                    <div className="input-wrap-registration">
                        <Input
                            id='password'
                            type='password'
                            value={password}
                            onChange={setPassword}
                            className={`input-login ${errorPassword ? 'border-error' : ''}`}
                            placeholder={translation.registration.your_password[lang]}
                        />
                        {
                            errorPassword && <label htmlFor="password" className="error-input">{translation.errors.incorrect_pass[lang]}</label>
                        }
                    </div>
                    <div className="input-wrap-registration">
                        <Input
                            id='match-pass'
                            type='password'
                            value={repeatPassword}
                            onChange={setRepeatPassword}
                            className={`input-login ${errorRepeatPass ? 'border-error' : ''}`}
                            placeholder={translation.registration.repeat_password[lang]}
                        />
                        {
                            errorRepeatPass && <label htmlFor="match-pass" className="error-input">{translation.errors.pass_dont_match[lang]}</label>
                        }
                    </div>
                    <Button type='submit' className={'btn-login'}>{translation.registration.registration[lang]}</Button>
                </form>
                <p>{translation.registration.have_account[lang]} <Link to='/login'>{translation.registration.login[lang]}</Link></p>
            </div>
            <Selector
                options={['ru', 'en']}
                change={setLanguage}
                current={language}
            />
        </div>
    )
}

export default Registration