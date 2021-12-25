import React from "react";
import Button from "../../button/button";
import {useDispatch, useSelector} from "react-redux";
import {changeTodo, deleteTodo} from "../../../redux/actions";
import Checkbox from "../../checkbox/checkbox";
import {changeTodoState, removeTodo} from "../../common/api";
import translation from "../../common/translation.json"

const Todo = ({todo}) => {
    const user = useSelector(state => state.user.user)
    const lang = useSelector(state => state.app.language)
    const dispatch = useDispatch()

    let date = todo.date.split(' ')
    date = date[0] + ' ' + translation.todos.months[date[1]][lang] + ' ' + date[2]

    const deleteTodoById = async (id) => {
        await removeTodo(user.uid, id)
        dispatch(deleteTodo(id))
    }

    const changeTodoById = async (todo) => {
        await changeTodoState(user.uid, todo)
        dispatch(changeTodo(todo.id))
    }

    return (
        <div className={`todo-wrap ${todo.completed ? 'todo-completed' : ''}`}>
            <div className="todo-info">
                <Checkbox checked={todo.completed} onChange={() => changeTodoById(todo)} />
                <div>
                    <h3>{todo.title}</h3>
                    <p className='date'>{date}</p>
                </div>
            </div>
            <Button className='delete-btn' action={() => deleteTodoById(todo.id)}>{translation.todos.delete[lang]}</Button>
        </div>
    )
}

export default Todo