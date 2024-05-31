import React from 'react'
import invaliduser from '../asset/notregistred.jpg';

export default function Notvaliduser() {
  return (
   <img src={invaliduser} alt="" width={400} style={{ position:"absolute", top:'100px'}}/>
  )
}
