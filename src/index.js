import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import {applyMiddleware, compose, createStore} from 'redux'
import { initializeApp } from "firebase/app";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/rootReducer";
import thunk from "redux-thunk";
import firebase from "firebase/compat";
import Context from "react-redux/lib/components/Context";
import {changeLanguage, loginUser} from "./redux/actions";
import {END_LOADING, LOGIN_USER, START_LOADING, UPDATE_AVATAR} from "./redux/types";

firebase.initializeApp({
    apiKey: "AIzaSyCklXp778Zl2lOJnNuegXQBAPdkuBVdIRM",
    authDomain: "react-todo-app-47455.firebaseapp.com",
    projectId: "react-todo-app-47455",
    storageBucket: "react-todo-app-47455.appspot.com",
    messagingSenderId: "57286004999",
    appId: "1:57286004999:web:0e6062e4bbaad9c795b5a2"
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
// Для теста на мобильном
// export const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch({type: START_LOADING})
firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        store.dispatch({type: LOGIN_USER, payload: user})
        const avatar = (await firebase.database().ref(`/${user.uid}/avatar`).get())._delegate._node.value_
        store.dispatch({type: UPDATE_AVATAR, payload: avatar})
    }
    store.dispatch({type: END_LOADING})
})

const lang = localStorage.getItem('language')
if (lang) {
    store.dispatch(changeLanguage(lang))
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
