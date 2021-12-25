import React from 'react';
import Button from "../button/button";
import {useSelector} from "react-redux";
import translation from "../common/translation.json"

const NoTodos = () => {
    const lang = useSelector(state => state.app.language)

    const focusInput = () => {
        const event = new Event('addTodo')
        document.dispatchEvent(event)
    }

    return (
        <div className='no-todos-wrap'>
            <h1>{translation.home.no_todos[lang]}!</h1>
            <Button action={focusInput}>{translation.home.add_todo[lang]}</Button>
        </div>
    );
};

export default NoTodos;