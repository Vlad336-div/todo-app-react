import {
    ADD_TODO, CHANGE_FILTER, CHANGE_LANGUAGE,
    CHANGE_TODO, CLEAR_TODO, DELETE_AVATAR,
    DELETE_TODO, END_LOADING, FETCH_TODOS, HIDE_ERROR,
    HIDE_WARNING,
    LOGIN_USER,
    LOGOUT_USER,
    SHOW_ERROR,
    SHOW_WARNING, START_LOADING, UPDATE_AVATAR
} from "./types";

export const fetchingTodos = (todos) => {
    return {
        type: FETCH_TODOS,
        payload: todos
    }
}

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const deleteTodo = (id) => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const clearTodo = () => {
    return {
        type: CLEAR_TODO
    }
}

export const changeTodo = (id) => {
    return {
        type: CHANGE_TODO,
        payload: id
    }
}

export const showWarning = (text) => {
    return dispatch => {
        dispatch({type: SHOW_WARNING, payload: text})
        setTimeout(() => {
            dispatch(hideWarning())
        }, 3000)
    }
}

export const hideWarning = () => {
    return {
        type: HIDE_WARNING
    }
}

export const showError = (error) => {
    return dispatch => {
        dispatch({type: SHOW_ERROR, payload: error})
        setTimeout(() => {
           dispatch(hideError())
        }, 3000)
    }
}

export const hideError = () => {
    return {
        type: HIDE_ERROR
    }
}

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(clearTodo())
        dispatch(deleteAvatar())
        dispatch({type: LOGOUT_USER})
    }
}

export const updateAvatar = (avatar) => {
    return {
        type: UPDATE_AVATAR,
        payload: avatar
    }
}

export const deleteAvatar = () => {
    return {
        type: DELETE_AVATAR
    }
}

export const startLoading = () => {
    return {
        type: START_LOADING
    }
}

export const endLoading = () => {
    return {
        type: END_LOADING
    }
}

export const changeLanguage = (lang) => {
    return dispatch => {
        localStorage.setItem('language', lang)
        dispatch({type: CHANGE_LANGUAGE, payload: lang})
    }
}

export const changeFilterState = (filter) => {
    return {
        type: CHANGE_FILTER,
        payload: filter
    }
}