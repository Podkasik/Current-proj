import jwt_decode from 'jwt-decode'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'


 const isLogin = () => {
    const tokenKey = 'usertoken';
    if(localStorage.getItem(tokenKey))
    {
        var token =  localStorage.getItem(tokenKey);
        const decoded = jwt_decode(token);            
        if(decoded.role === "ADMIN")
        return true;
    }
    else {
        return false;
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;