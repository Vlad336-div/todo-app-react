import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const ProtectedRoute = ({children}) => {
    const user = useSelector(state => state.user.user)

    if (!user) {
        return <Navigate to='/login' />
    }
    return children
}