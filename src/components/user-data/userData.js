import React, {useContext, useEffect, useState} from "react";
import Button from "../button/button";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "./Avatar";
import Email from "./Email";
import translation from "../common/translation.json"
import Selector from "../selector/Selector";
import {changeLanguage} from "../../redux/actions";

const UserData = ({updateEmail, updatePass}) => {
    const [language, setLanguage] = useState('')

    const user = useSelector(state => state.user.user)
    const todos = useSelector(state => state.todos.todos)
    const lang = useSelector(state => state.app.language)

    const dispatch = useDispatch()

    let counterCompetedTodos = 0

    todos.forEach(item => {
        if (item.completed) counterCompetedTodos++
    })

    useEffect(() => {
        if (language) dispatch(changeLanguage(language))
    }, [language])

    useEffect(() => {
        if (lang) setLanguage(lang)
    }, [])

    return (
        <div className='user-data-wrap'>
            <div className='logo area'>
                <div className={'text'}>
                    <p>todo</p>
                    <p>app.</p>
                </div>
            </div>
            <Email user={user}/>
            <div className={'avatar area'}>
                <Avatar/>
            </div>
            <div className={'todos-info area'}>
                {
                    !todos.length ?
                        <p>{translation.home.no_todos[lang]}</p>
                        :
                        <p>{translation.home.all_todos[lang]}: {todos.length}<br/>{translation.home.completed_todos[lang]}: {counterCompetedTodos}</p>
                }
            </div>
            <div className={'settings area'}>
                {
                    user.providerData[0].providerId === 'password' && <Button action={updatePass}>{translation.home.edit_password[lang]}</Button>
                }
                <Button action={updateEmail}>{translation.home.edit_email[lang]}</Button>
                <Selector
                    options={['ru', 'en']}
                    current={language}
                    change={setLanguage}
                    className='selector-settings'
                />
            </div>
        </div>
    )
}

export default UserData