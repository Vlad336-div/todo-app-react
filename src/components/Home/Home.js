import React, {useEffect, useRef, useState} from "react";
import UserData from "../user-data/userData";
import Todos from "../todos/todos";
import NewTodo from "../newTodo/newTodo";
import ModalUpdateEmail from "../modals/modalUpdateEmail";
import {updateEmailFirebase} from "../common/api";
import ModalMessage from "../modals/modalMessage";
import ModalUpdatePass from "../modals/modalUpdatePass";
import Filters from "../filters/Filters";

function Home() {
    const [hiddenEmailModal, setHiddenEmailModal] = useState(true)
    const [hiddenPasswordModal, setHiddenPasswordModal] = useState(true)
    const [hiddenMessage, setHiddenMessage] = useState(true)

    useEffect(() => {
        document.title = 'Главная'
    }, [])

    return (
        <div className='container-home'>
            {
                !hiddenEmailModal && <ModalUpdateEmail showMessage={() => setHiddenMessage(false)} close={() => setHiddenEmailModal(true)}/>
            }
            {
                !hiddenPasswordModal && <ModalUpdatePass close={() => setHiddenPasswordModal(true)}/>
            }
            {
                !hiddenMessage && <ModalMessage title='confirm email' description='a letter has been sent to your mailbox confirm your email' close={() => setHiddenMessage(true)}/>
            }
            <UserData updateEmail={() => setHiddenEmailModal(false)} updatePass={() => setHiddenPasswordModal(false)}/>
            <NewTodo/>
            <Filters/>
            <Todos/>
        </div>
    );
}

export default Home;
