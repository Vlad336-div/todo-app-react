import React from "react";
import check from '../../img/check.png'

const Checkbox = ({checked, className, onChange}) => {

    return (
        <div
            className={`${className ? className : ''} ${checked ? 'active-checkbox' : ''} checkbox-component`}
            onClick={onChange}
        >
            {checked && <img src={check} alt="check"/>}
        </div>
    )
}

export default Checkbox