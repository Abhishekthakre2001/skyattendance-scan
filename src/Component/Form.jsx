import React from 'react';
import '../Style/Form.css';
import axios from 'react';


export default function Form(props) {
    var today = new Date(),
    todaydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var hours = today.getHours();
    var ampm =  (hours >= 12) ? "PM" : "AM";
    var clockout = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' +ampm;

    var attendance = (clockout <= '09:30:00') ? "PRESENT" : "LATE";
    

    const clockindata = {
                email:props.user.email,
                name:props.user.name,
                clockin:props.date,
                clockout:'02.00',
                image:props.user.picture,
                attendance:attendance,  
                date:todaydate,
                day:props.time,
                latitude:props.position.latitude,
                longitude:props.position.longitude,
                location:props.locationName,
                
            }

            const clockoutdata = {
                email:props.user.email,
                clockout:clockout,
            }
            console.log("Checkin data",clockindata);
            console.log("Checkout data",clockoutdata)


// const clockin = async () => {
//     const data = {
//         email:props.user.email,
//         name:props.user.name,
//         clockin:props.date,
//         clockout:'02.00',
//         image:props.user.picture,
//         attendance:'P',  
//         date:todaydate,
//         day:props.time,
//         latitude:props.position.latitude,
//         longitude:props.position.longitude,
//         location:props.locationName,
//     }
//     try{
// const savedata = await axios.POST(`http://localhost:3000/clockin`,data)
// .then((response) => console.log(response))
//     .catch((error) => console.log(error));
//     }

// }
// console.log('dataaaa',props.user.picture)
    // console.log('dataaaa',props.user)
    return (
        <>
            <div className="form">
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                            Date
                        </span>
                    </div>
                    <input
                    style={{ backgroundColor:'white'}}
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
                    style={{ backgroundColor:'white'}}
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
                    style={{ backgroundColor:'white'}}
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
                    style={{ backgroundColor:'white'}}
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
                    style={{ backgroundColor:'white'}}
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
                    style={{ backgroundColor:'white'}}
                        type="text"
                        className="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        value={props.locationName}
                        disabled
                    />
                </div>
               
                <div className="buttons" >
                <button type="button" className="btn btn-primary buttons">Clock In</button>
                <button type="button" className="btn btn-primary buttons">Clock out</button>
                </div>
            </div>

        </>
    )
}
