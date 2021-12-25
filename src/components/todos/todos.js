import React, {useEffect, useState} from "react";
import Todo from "./todo/todo";
import {useSelector} from "react-redux";
import NoTodos from "../noTodos/NoTodos";

const Todos = () => {
    const [todos, setTodos] = useState([])

    const todosState = useSelector(state => state.todos.todos)
    const filter = useSelector(state => state.todos.filter)

    useEffect(() => {
        switch(filter) {
            case 'all':
                setTodos(todosState)
                break
            case 'completed':
                const completedTodos = todosState.filter(item => item.completed)
                setTodos(completedTodos)
                break
            case 'not_completed':
                const notCompletedTodos = todosState.filter(item => !item.completed)
                setTodos(notCompletedTodos)
                break
            default:
                setTodos(todosState)
        }
    }, [filter, todosState])

    if (!todos.length) return <NoTodos/>

    return (
        todos.map(todo => <Todo key={todo.id} todo={todo}/>)
    )
}

export default Todos