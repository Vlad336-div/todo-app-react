import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Registration from "./components/registration/registration";
import Loader from "./components/Loader/Loader";
import {ProtectedRoute} from "./components/ProtectedRoute";
import NotFound from "./components/404/404";
import Warning from "./components/warning/warning";
import {useSelector} from "react-redux";
import {fetchTodos} from "./components/common/api";

function App() {
    const warning = useSelector(state => state.app.warning)
    const error = useSelector(state => state.app.error)
    const user = useSelector(state => state.user.user)
    const loading = useSelector(state => state.app.loading)

    useEffect(async () => {
        if (user) await fetchTodos(user?.uid)
    }, [user])

    return (
        <div>
            {
                loading ? <Loader/>
                    : (
                        <BrowserRouter>
                            <Routes>
                                <Route exact path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                                <Route exact path='/loader' element={<Loader/>}/>
                                <Route exact path='/login' element={<Login/>}/>
                                <Route exact path='/registration' element={<Registration/>}/>
                                <Route path='*' element={<NotFound/>} />
                            </Routes>
                        </BrowserRouter>
                    )
            }
            {
                error && <Warning text={error}/>
            }
            {
                warning && <Warning text={warning}/>
            }
        </div>
    );
}

export default App;
