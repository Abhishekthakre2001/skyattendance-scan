import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import '../Style/Homepage.css';

import Form from '../Component/Form';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';

export default function Homepage() {
    const location = useLocation(); // Get the current location (pathname + search)
    const { user, isAuthenticated } = useAuth0();
    const [queryParams, setQueryParams] = useState({
        date: '',
        time: '',
        latitude: '',
        longitude: '',
        location:''
    });
    const [position, setPosition] = useState(null);
    const [locationName, setLocationName] = useState('Fetching location...');

    useEffect(() => {
        // Parse the query string from the location
        const parsed = queryString.parse(location.search);
        setQueryParams(parsed);
    }, [location.search]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ latitude, longitude });
                    console.log({ latitude, longitude })
                    getlocationname(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                    // setLocationName('Location: Not found');
                }
            );
        } else {
            console.log("Geolocation is not available in your browser.");
            // setLocationName('Geolocation is not available in your browser.');
        }
    }, []);

    const getlocationname = async (latitude, longitude) => {
        console.log({ latitude, longitude })
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
            );
            const data = await response.json();
            console.log(data.address.neighbourhood)
            setLocationName(data.address.neighbourhood || 'Location: Not found');
        } catch (error) {
            console.error('Error fetching location:', error);
            setLocationName(' Network Slow ');
        }
    };

   
   
   
    return (
        <>
            <div className="container hp">
                <div className="row">
                    <div className="col-12 col-lg-4 offset-lg-4 box">
                      {isAuthenticated ? <Logout /> : <Login />} 
                        {isAuthenticated && (
                            <>
                                {/* <div className="logo">
                                    <img src={logo} alt="" />
                                </div> */}
                                <Profile /> 
                                <Form {...queryParams} locationName={locationName} position={position} user={user}/> 
                            </>
                        )}
                       
                    </div>
                </div>
            </div>
        </>
    );
}
