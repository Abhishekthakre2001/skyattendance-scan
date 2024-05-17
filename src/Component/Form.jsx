import React from 'react';
import '../Style/Form.css';

export default function Form(props) {
    console.log('dataaaa',props.date)
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
                        value={props.latitude}
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
                        value={props.longitude}
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
