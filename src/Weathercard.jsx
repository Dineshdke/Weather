import React from 'react';
import "./Weathercard.css"

export default function Weathercard({name,des,unit}) {
  return (
    <div className='weather-card'>
      <h3>{name}</h3>
      <div>{des} {unit}</div>
    </div>
  )
}
