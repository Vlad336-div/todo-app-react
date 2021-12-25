import {CHANGE_LANGUAGE, END_LOADING, HIDE_ERROR, HIDE_WARNING, SHOW_ERROR, SHOW_WARNING, START_LOADING} from "./types";
import {errors} from "../components/common/errors";

const initialState = {
    warning: '',
    error: '',
    loading: false,
    language: 'ru'
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_WARNING:
            return {...state, warning: action.payload}
        case HIDE_WARNING:
            return {...state, warning: ''}
        case SHOW_ERROR:
            const errorCode = errors.find(item => item.code === action.payload) ? errors.find(item => item.code === action.payload)[state.language] : null
            const error = errorCode ? errorCode : errors.find(item => item.code === 'default')[state.language]
            return {...state, error: error}
        case HIDE_ERROR:
            return {...state, error: ''}
        case START_LOADING:
            return {...state, loading: true}
        case END_LOADING:
            return {...state, loading: false}
        case CHANGE_LANGUAGE:
            return {...state, language: action.payload}
        default: return state
    }
}