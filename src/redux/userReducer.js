import {DELETE_AVATAR, LOGIN_USER, LOGOUT_USER, UPDATE_AVATAR} from "./types";

const initialState = {
    user: null,
    avatar: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, user: action.payload}
        case LOGOUT_USER:
            return {...state, user: null}
        case UPDATE_AVATAR:
            return {...state, avatar: action.payload}
        case DELETE_AVATAR:
            return {...state, avatar: ''}
        default: return state
    }
}