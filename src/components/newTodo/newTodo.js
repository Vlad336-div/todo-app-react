import React, {useEffect, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import {dateTransform} from "../common/commonFunctions";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, showWarning} from "../../redux/actions";
import {addTodoFirebase} from "../common/api";
import translation from "../common/translation.json"

const NewTodo = () => {
    const user = useSelector(state => state.user.user)
    const lang = useSelector(state => state.app.language)

    const [todo, setTodo] = useState('')

    const dispatch = useDispatch()

    const addNewTodo = async (e) => {
        e.preventDefault()
        if (!todo.trim()) {
            return dispatch(showWarning('Input todo!'))
        }
        const date = dateTransform(new Date())
        let newTodo = {
            title: todo,
            date,
            id: '',
            completed: false
        }
        const keyTodoFirebase = await addTodoFirebase(newTodo, user.uid)
        newTodo = {...newTodo, id: keyTodoFirebase}
        dispatch(addTodo(newTodo))
        setTodo('')
    }

    useEffect(() => {
        document.addEventListener('addTodo', () => {
            document.querySelector('.new-todo').focus()
        })
        return document.removeEventListener('addTodo', () => {
            document.querySelector('.new-todo').focus()
        })
    }, [])

    return (
        <form onSubmit={e => addNewTodo(e)} className='form-new-todo'>
            <Input
                placeholder={translation.home.input_todo[lang]}
                type='text'
                value={todo}
                onChange={setTodo}
                className='new-todo'
            />
            <Button type='submit'>{translation.home.add_todo[lang]}</Button>
        </form>
    )
}

export default NewTodo
