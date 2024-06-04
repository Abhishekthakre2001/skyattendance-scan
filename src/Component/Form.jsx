import React, { useState, useEffect } from 'react';
import '../Style/Form.css';
import axios from 'axios';
// import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import invalidqr from "../asset/invalidqr.avif"

export default function Form(props) {
    // const [validqr, setinvalidqr] = useState('block')
    let today = new Date();
    let todaydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let ampm = (hours >= 12) ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    let clockout = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

    console.log("newtime", clockout);
    const [usertime, setusertime] = useState('');

    // var attendance = (clockout <= usertime) ? "PRESENT" : "LATE";
    // Function to convert time to seconds
    function convertTimeToSeconds(time) {
        let [timePart, modifier] = time.split(' ');
        let [hours, minutes, seconds] = timePart.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);
        seconds = parseInt(seconds);

        if (modifier === 'PM' && hours < 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        return (hours * 3600) + (minutes * 60) + seconds;
    }

    let clockoutSeconds = convertTimeToSeconds(clockout);
    let usertimeSeconds = convertTimeToSeconds(usertime);
    console.log("all second" + usertimeSeconds)
    console.log("all second" + clockoutSeconds)

    let attendance = (clockoutSeconds <= usertimeSeconds) ? "PRESENT" : "LATE";

    console.log("Attendance: " + attendance);

    const [buttonstetus, setbuttonstetus] = useState(false);
    const [buttondisplay, setbuttondisplay] = useState('block')

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
        todaydate: todaydate,
    }
    console.log("Checkin data", clockindata);
    console.log("Checkout data", clockoutdata)

    const [validationurl, setvalidationurl] = useState(false)

    useEffect(() => {
        const checkqrcode = () => {
            const checkscancodetime = props.date;
            console.log("firsttime", checkscancodetime);
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
            }).replace(/,/g, ""); // Remove the comma

            console.log("Formatted Date:", formattedDate);
            const firstDate = new Date(checkscancodetime);
            const secondDate = new Date(formattedDate);

            // Calculate the time difference in milliseconds
            const timeDifferenceMs = secondDate - firstDate;
            console.log("differance:", timeDifferenceMs, "ms");
            if (timeDifferenceMs <= 72000) {
                setvalidationurl(`ture`)
                console.log("Correct QR Code ", validationurl);
            } else {
                setvalidationurl(false)
                console.log("incorrect QR Code ", validationurl);
            }
        };
        checkqrcode();
    }, [props.date, validationurl]);

    const clockin = async () => {


        // const timeDifference = currentTime - scannedTime;

        try {
            const savedata = await axios.post('http://localhost:7000/clockin', clockindata);
            console.log('Data saved successfully:', savedata);
            toast.success("Clock IN Success !");
            button();
        } catch (error) {
            console.error('Error clocking in:', error);
            toast.error("Oops Slow Network !");
        }
    };

    const clock_out = async () => {
        try {
            const updatedata = await axios.put('http://localhost:7000/clockout', clockoutdata);
            console.log("clockoutdone", updatedata);
            toast.success("Clock OUT Success !");
            setbuttondisplay('none')
        }
        catch (error) {
            console.log(error);
            toast.error("Oops Slow Network !");
        }
    }


    

    useEffect(() => {
    const button = async () => {
        const email = props.user.email;

        console.log("first", todaydate);

        try {
            const getuserdata = await axios.get(`http://localhost:7000/button?email=${email}&date=${todaydate}`);
            console.log("button", getuserdata.data.result[0].clockout);
            if (getuserdata.data.result[0].clockout === '02.00') {
                setbuttondisplay("block");
            } else {
                setbuttondisplay("none");
            }
            setbuttonstetus(true)
        } catch (error) {
            console.log(error);
        }
    };
    button();
}, [ props.user.email, todaydate]);

    // console.log("form display", validqr)
    useEffect(() => {
        const getusertime = async () => {
            const email = props.user.email;
    
            console.log("first", props.date);
    
            try {
                const getuserdata = await axios.get(`http://localhost:7000/getusertime?email=${email}`);
                console.log("getusertime", getuserdata.data.result[0].time);
                console.log(clockout)
                setusertime(getuserdata.data.result[0].time);
            } catch (error) {
                console.log(error);
            }
        };
        getusertime();
   

    }, [getusertime]);
    return (
        <>
            {validationurl ? (
                <div className="form"  >
                    <ToastContainer />
                    {/* <div className="input-group input-group-sm mb-3">
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
                </div> */}

                    {/* <div className="input-group input-group-sm mb-3">
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
                </div> */}

                    {/* <div className="input-group input-group-sm mb-3">
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
                </div> */}

                    {/* <div className="input-group input-group-sm mb-3">
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
                </div> */}

                    {/* <div className="input-group input-group-sm mb-3">
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
                </div> */}

                    {/* <div className="input-group input-group-sm mb-3">
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
                </div> */}

                    <div className="buttons" >


                        {
                            (buttonstetus === true) ?
                                <>
                                    <button class="btn color-a top" onClick={clock_out} style={{ display: buttondisplay }} > Clock Out</button>
                                </>
                                :
                                <>
                                    <button class="btn color-a top" onClick={clockin} style={{ display: buttondisplay }} > Clock In</button>
                                </>


                        }

                    </div>


                    <div className="newformui">




                        <div class="grid-2">
                            <button class="color-b circule">
                                <MdOutlineCalendarToday style={{ fontSize: '30px' }} />
                            </button>
                            <h2 class="title-2">{props.time}</h2>
                            <p class="followers">Day</p>
                        </div>
                        <div class="grid-2">
                            <button class="color-c circule"><MdOutlineAccessTime style={{ fontSize: '30px' }} /></button>
                            <h2 class="title-2">{props.date}</h2>
                            <p class="followers">Date Time</p>
                        </div>
                        <div class="grid-2">
                            <button class="color-d circule"><CiLocationOn style={{ fontSize: '30px' }} /></button>
                            <h2 class="title-2">{props.locationName}</h2>
                            <p class="followers">Location</p>
                        </div>
                    </div>
                </div>

            ) : (

                <>
                    <div className="invalidqr">
                        <h1 style={{ fontFamily: "emoji" }}>Invalid QR Code Scan Again</h1>
                        <img className="" src={invalidqr} alt="InvalidQR Scan Again" width={300} />
                    </div>
                </>
            )
            }
        </>
    )
}