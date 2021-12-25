import React from "react";

const Button = (props) => {
    return (
        <button
            className={`${props.className ? props.className : ''} btn-component`}
            type={`${props.type ? props.type : 'button'}`}
            onClick={props.action}
        >
            {props.children}
        </button>
    )
}

export default Button