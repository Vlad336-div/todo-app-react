import {ADD_TODO, CHANGE_FILTER, CHANGE_TODO, CLEAR_TODO, DELETE_TODO, FETCH_TODOS} from "./types";

const initialState = {
    todos: [],
    filter: 'all'
}

export const todosReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_TODOS:
            return {...state, todos: [...action.payload]}
            break
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
            break
        case DELETE_TODO:
            const filterTodo = state.todos.filter(item => item.id !== action.payload)
            return {...state, todos: filterTodo}
            break
        case CLEAR_TODO:
            return {...state, todos: []}
            break
        case CHANGE_TODO:
            const newTodos = state.todos.map(item => {
                if (item.id === action.payload) {
                    item.completed = !item.completed
                }
                return item
            })
            return {...state, todos: newTodos}
            break
        case CHANGE_FILTER:
            return {...state, filter: action.payload}
            break
        default: return state
    }
}