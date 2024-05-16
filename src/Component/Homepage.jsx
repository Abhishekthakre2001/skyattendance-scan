import React from 'react';
import '../Style/Homepage.css';
import logo from '../asset/logo.png';
import Form from '../Component/Form';
// import photo from '../asset/PASSPHOTO.jpg';
// import { MdLogout } from "react-icons/md";
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useState, useEffect } from 'react';


export default function Homepage() {

    const location = useLocation(); // Get the current location (pathname + search)
    const [queryParams, setQueryParams] = useState({
        date: '',
        time: '',
        latitude: '',
        longitude: ''
    });

    useEffect(() => {
        // Parse the query string from the location
        const parsed = queryString.parse(location.search);
        setQueryParams(parsed);
    }, [location.search]);

    console.log("data",queryParams)

    const { isAuthenticated } = useAuth0();
    return (
        <>
            <div className="container hp">
                <div className="row">
                    <div className="col-12 col-lg-4 offset-lg-4 box">
                        
                        {isAuthenticated ? <Logout /> : <Login />}
                        {isAuthenticated && <> <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        <Profile /> 
                        <Form {...queryParams}/></>}
                        
                    </div>
                </div>
            </div>
        </>
    )
}
