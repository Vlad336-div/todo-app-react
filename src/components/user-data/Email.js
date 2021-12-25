import React, {useState} from 'react';
import verified from "../../img/verified.png";
import unverified from "../../img/unverified.png";
import Button from "../button/button";
import {logOut} from "../common/api";
import {logoutUser} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import ModalVerify from "../modals/modalVerify";
import ModalUnverify from "../modals/modalUnverify";
import translation from "../common/translation.json"

const Email = ({user}) => {
    const [verifyModalShow, setVerifyModalShow] = useState(false)
    const [unverifyModalShow, setUnverifyModalShow] = useState(false)

    const dispatch = useDispatch()

    const lang = useSelector(state => state.app.language)

    const logout = async () => {
        await logOut()
        dispatch(logoutUser())
    }

    return (
        <div className={'email-block area'}>
            {
                verifyModalShow && <ModalVerify close={() => setVerifyModalShow(false)}/>
            }
            {
                unverifyModalShow && <ModalUnverify close={() => setUnverifyModalShow(false)}/>
            }
            <div className='email'>
                <p>{user.email}</p>
                {
                    user.emailVerified ?
                        <img src={verified} alt='Email верифицирован' onClick={() => setVerifyModalShow(true)}/>
                        :
                        <img src={unverified} alt='Email не верифицирован' onClick={() => setUnverifyModalShow(true)}/>
                }
            </div>
            <Button action={logout}>{translation.home.logout[lang]}</Button>
        </div>
    );
};

export default Email;