import {combineReducers} from "redux";
import {todosReducer} from "./todoReducer";
import {appReducer} from "./appReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    todos: todosReducer,
    app: appReducer,
    user: userReducer
})