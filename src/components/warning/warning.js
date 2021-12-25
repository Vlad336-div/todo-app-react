import React from "react";
import {useDispatch} from "react-redux";
import {hideWarning} from "../../redux/actions";

const Warning = ({text}) => {
    const dispatch = useDispatch()

    return (
        <div className='warning-component' onClick={() => dispatch(hideWarning())}>
            {text}
        </div>
    )
}

export default Warning