import firebase from 'firebase/compat/app'
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    verifyBeforeUpdateEmail,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithPopup,
    updatePassword
} from 'firebase/auth'
import {
    getDownloadURL
} from 'firebase/storage'
import 'firebase/compat/functions'
import {store} from "../../index";
import {endLoading, fetchingTodos, showError, startLoading} from "../../redux/actions";

export const getAuthUser = async () => {
    const response = await getAuth()
    return response
}

export const login = async (email, password) => {
    let response = null
    const auth = await getAuthUser()
    store.dispatch(startLoading())
    signInWithEmailAndPassword(auth, email, password).then(result => {
        store.dispatch(endLoading())
        const user = result.user
        response = user
    }).catch(e => {
        store.dispatch(endLoading())
        store.dispatch(showError(e.code))
    })
    return response
}

export const registration = async (email, password) => {
    let response = null
    const auth = await getAuthUser()
    await createUserWithEmailAndPassword(auth, email, password).then(async result => {
        if (result.user) await sendEmailVerification(result.user)
        response = 200
    }).catch(e => store.dispatch(showError(e.code)))
    return response
}

export const logOut = async () => {
    const auth = await getAuthUser()
    store.dispatch(startLoading())
    signOut(auth).then(() => store.dispatch(endLoading()))
}

export const sendEmailResetPass = async (email) => {
    const auth = await getAuthUser()
    await sendPasswordResetEmail(auth, email)
}

export const fetchTodos = async (uid) => {
    let todos = []
    await firebase.database().ref(`/${uid}/todos`).once('value', (snapshot) => {
        for (let j in snapshot.val()) {
            todos.push(snapshot.val()[j])
        }
    })
    store.dispatch(fetchingTodos(todos))
}

export const addTodoFirebase = async (todo, uid) => {
    const response = await firebase.database().ref(`/${uid}/todos`).push(todo)
    await firebase.database().ref(`/${uid}/todos/${response.key}`).update({id: response.key})
    return response.key
}

export const changeTodoState = async (uid, todo) => {
    await firebase.database().ref(`/${uid}/todos/${todo.id}`).update({completed: !todo.completed})
}

export const removeTodo = async (uid, id) => {
    await firebase.database().ref(`/${uid}/todos/${id}`).remove()
}

export const uploadAvatarFirebase = async (blob, uid) => {
    const ref = `/${uid}/${blob.name}`
    await firebase.storage().ref(ref).put(blob)
    const url = await firebase.storage().ref(ref).getDownloadURL()
    await firebase.database().ref(`/${uid}/avatar`).set(url)

    return url
}

export const authWithGoogle = async () => {
    const auth = await getAuthUser()
    const provider = new firebase.auth.GoogleAuthProvider()
    await signInWithPopup(auth, provider).then(() => {}).catch(e => store.dispatch(showError(e.code)))
}

export const sendVerifycateCode = async () => {
    firebase.auth().currentUser.sendEmailVerification().then(() => {

    })
    .catch(e => {
        store.dispatch(showError(e.code))
    })
}

export const updateEmailFirebase = async (email) => {
    let response = null
    await firebase.auth().currentUser.verifyBeforeUpdateEmail(email).then(result => {
        response = 200
    })
    .catch(e => {
        response = 'error'
        store.dispatch(showError(e.code))
    })
    return response
}

export const updatePassFirebase = async (email, oldPass, newPass) => {
    // const authUser = await getAuthUser()
    let response = null
    await firebase.auth().signInWithEmailAndPassword(email, oldPass).then(async () => {
        await firebase.auth().currentUser.updatePassword(newPass)
        response = 200
    })
    .catch(e => store.dispatch(showError(e.code)))
    return response
}