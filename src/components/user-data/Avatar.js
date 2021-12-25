import React, {useRef} from 'react';
import default_avatar from "../../img/default_avatar.png";
import {useDispatch, useSelector} from "react-redux";
import {uploadAvatarFirebase} from "../common/api";
import {updateAvatar} from "../../redux/actions";

const Avatar = () => {
    const input = useRef(null)
    const user = useSelector(state => state.user.user)
    const avatarFirebase = useSelector(state => state.user.avatar)
    const dispatch = useDispatch()

    const avatar = avatarFirebase ? avatarFirebase : (user?.photoURL ? user.photoURL : default_avatar)

    const uploadAvatar = async () => {
        const file = input.current.files[0]
        const newAvatar = await uploadAvatarFirebase(file, user.uid)
        dispatch(updateAvatar(newAvatar))
    }

    return (
        <div>
            <input onChange={uploadAvatar} ref={input} type="file" hidden/>
            <img
                onClick={() => input.current.click()}
                src={avatar}
                alt="avatar"
            />
        </div>
    );
};

export default Avatar;