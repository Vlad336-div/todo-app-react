import React, {useEffect, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {authWithGoogle, login} from '../common/api'
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage, loginUser} from "../../redux/actions";
import {validate} from "../common/validate";
import ModalResetPass from "../modals/modalResetPass";
import translation from "../common/translation.json"
import googleIcon from "../../img/google.png"
import Selector from "../selector/Selector";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visibleInputEmail, setVisibleInputEmail] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [language, setLanguage] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const lang = useSelector(state => state.app.language)
    const navigate = useNavigate()

    const loginClick = async (e) => {
        e.preventDefault()
        const form = [
            {
                type: 'email',
                value: email
            },
            {
                type: 'password',
                value: password
            }
        ]
        const {is_valid, items} = validate(form)
        items.forEach(item => {
            const type = item.type[0].toUpperCase()+item.type.slice(1)
            eval('setError'+type)(!item.valid)
        })
        if (!is_valid) return
        const response = await login(email, password)
        if (response) {
            dispatch(loginUser(response))
            navigate('/')
        }
    }

    const loginWithGoogle = async () => {
        await authWithGoogle()
    }

    useEffect(() => {
        document.title = translation.login.login[language]
        if (language) {
            dispatch(changeLanguage(language))
        }
    }, [language])

    useEffect(() => {
        setLanguage(lang)
    }, [])

    if (user) return <Navigate to='/'/>

    return (
        <div>
            {
                visibleInputEmail && <ModalResetPass
                                        close={() => setVisibleInputEmail(prev => !prev)}
                                    />
            }
            <div className='login-wrap'>
                <div className='left-block'>
                    <div className={'text'}>
                        <p>todo</p>
                        <p>app.</p>
                    </div>
                </div>
                <div className="right-block">
                    <form onSubmit={e => loginClick(e)}>
                        <h2>{translation.login.login[lang]}</h2>
                        <div className='input-wrap-login'>
                            <Input
                                type='email'
                                id='email'
                                value={email}
                                onChange={setEmail}
                                className={`input-login ${errorEmail ? 'border-error' : ''}`}
                                placeholder={translation.login.your_email[lang]}
                            />
                            {
                                errorEmail && <label for='email' className='error-input'>{translation.errors.incorrect_email[lang]}</label>
                            }
                        </div>
                        <div className='input-wrap-login'>
                            <Input
                                value={password}
                                id='password'
                                onChange={setPassword}
                                type='password'
                                className={`input-login ${errorPassword ? 'border-error' : ''}`}
                                placeholder={translation.login.your_password[lang]}
                            />
                            {
                                errorPassword && <label for='password' className='error-input'>{translation.errors.incorrect_pass[lang]}</label>
                            }
                        </div>
                        <Button type='submit' className={'btn-login'}>{translation.login.login[lang]}</Button>
                        <Button action={loginWithGoogle} className={'btn-login google'}>
                            <img src={googleIcon} alt='google'/>
                            Google
                        </Button>
                        <p onClick={() => setVisibleInputEmail(prev => !prev)}>{translation.login.reset_password[lang]}</p>
                    </form>
                    <p>{translation.login.dont_have_an_account_yet[lang]} <Link to='/registration'>{translation.login.register_now[lang]}</Link></p>
                </div>
            </div>
            <Selector
                options={['ru', 'en']}
                current={language}
                change={setLanguage}
            />
        </div>
    )
}

export default Login