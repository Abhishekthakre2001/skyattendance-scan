// import React, { useState, useEffect } from 'react';
import '../Style/Form.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Form(props) {
    var today = new Date(),
        todaydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var hours = today.getHours();
    var ampm = (hours >= 12) ? "PM" : "AM";
    var clockout = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' + ampm;
    console.log(clockout)
    var attendance = (clockout <= '09:30:00') ? "PRESENT" : "LATE";

    const displaybuttonin = (clockout <= '02:00:00 PM') ? "none" : "block";
    const displaybuttonout = (clockout >= '02:00:00 PM') ? "none" : "block";
    // const displaybuttonout = "block"

    const clockindata = {
        email: props.user.email,
        name: props.user.name,
        clockin: props.date,
        clockout: '02.00',
        image: props.user.picture,
        attendance: attendance,
        date: todaydate,
        day: props.time,
        latitude: props.position.latitude,
        longitude: props.position.longitude,
        location: props.locationName,

    }

    const clockoutdata = {
        email: props.user.email,
        clockout: clockout,
    }
    console.log("Checkin data", clockindata);
    console.log("Checkout data", clockoutdata)



    const clockin = async () => {
        try {
            const savedata = await axios.post('http://localhost:7000/clockin', clockindata);
            console.log('Data saved successfully:', savedata);
            toast.success("Clock IN Success !", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
        } catch (error) {
            console.error('Error clocking in:', error);
            toast.error("Oops Slow Network !", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
        }
    };

    const clock_out = async () => {
        try {
            const updatedata = await axios.put('http://localhost:7000/clockout', clockoutdata);
            console.log("clockoutdone", updatedata);
            toast.success("Clock OUT Success !", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
        }
        catch (error) {
            console.log(error);
            toast.error("Oops Slow Network !", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
        }
    }
    // const alldata = async () =>{
    //     try{
    //         const getdata = await axios.get('http://localhost:7000/attendance');
    //         console.log("attendance data",getdata.data.result.map(record => record.email));
    //         console.log("attendance",getdata.data.result.map(record => record.date));
    //     }catch(error){
    //         console.log("data not get")
    //     }
    // }
    // useEffect(() => {
    //     alldata();
    // }, []);

    // const clockbutton = ( )

    return (
        <>
            <div className="form" >
            <ToastContainer />
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Date
                        </span>
                    </div>
                    <input
                        style={{ backgroundColor: 'white' }}
                        disabled
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={todaydate}

                    />
                </div>

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Time
                        </span>
                    </div>
                    <input
                        style={{ backgroundColor: 'white' }}
                        disabled
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={props.date}

                    />
                </div>

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Day
                        </span>
                    </div>
                    <input
                        style={{ backgroundColor: 'white' }}
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={props.time}
                        disabled
                    />
                </div>

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Lati.
                        </span>
                    </div>
                    <input
                        style={{ backgroundColor: 'white' }}
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={props.position.latitude}
                        disabled
                    />
                </div>

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Lon.
                        </span>
                    </div>
                    <input
                        style={{ backgroundColor: 'white' }}
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={props.position.longitude}
                        disabled
                    />
                </div>

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Loca.
                        </span>
                    </div>
                    <input
                        style={{ backgroundColor: 'white' }}
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={props.locationName}
                        disabled
                    />
                </div>

                <div className="buttons" >
                    <button type="button" className="btn btn-primary buttons" onClick={clockin} style={{ display: displaybuttonin }}>Clock In</button>
                    <button type="button" className="btn btn-primary buttons" onClick={clock_out} style={{ display: displaybuttonout }} >Clock out</button>
                </div>
               
            </div>

        </>
    )
}
