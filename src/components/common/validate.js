import {store} from "../../index";
import {showWarning} from "../../redux/actions";

// RegExp
const email = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/

export const validate = (form) => {
    let is_valid = true
    let items = []
    form.forEach(item => {
        switch (item.type) {
            case 'email':
                if (email.test(item.value)) {
                    items.push({type: 'email', valid: true})
                } else {
                    items.push({type: 'email', valid: false})
                    is_valid = false
                    // store.dispatch(showWarning('Invalid email'))
                }
                break;
            case 'password':
                if (password.test(item.value)) {
                    items.push({type: 'password', valid: true})
                } else {
                    items.push({type: 'password', valid: false})
                    is_valid = false
                    // store.dispatch(showWarning('Very easy password'))
                }
                break;
            case 'repeatPass':
                if (item.value === item.repeatPass) {
                    items.push({type: 'repeatPass', valid: true})
                } else {
                    items.push({type: 'repeatPass', valid: false})
                    is_valid = false
                    // store.dispatch(showWarning('Passwords don`t match'))
                }
                break;
        }
    })
    return {is_valid, items}
}