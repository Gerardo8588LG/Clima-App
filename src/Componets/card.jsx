import React from 'react'

function Card({weather, toggle, setToggle}) {
    const temp = toggle ? parseInt((weather.temperature * 9/5)) + 32 : weather.temperature
  return (
    <div className='card'>
    <h1 className='card__title'>Weather App</h1>
    <h2 className='card_subtitle'>{weather.city}, {weather.country}</h2>
    <div className='card__body'>
    <img src={weather.icon} alt={weather.main} width={150} />
    <div className="card__info"></div>
    <h3 className='card_main'>{weather.main}</h3>
      <p className='card_wind-speed'>Wind speed {weather.wind}m/s</p>
      <p className='card__clouds'>Clouds {weather.clouds}%</p>
      <p className='card__pressure'>Pressure {weather.pressure}hPa</p>
    </div>
      <h2 className= "card__temperature" >{temp} {toggle ? "°F" : "°C"}</h2>

     
      <button onClick={() => setToggle(!toggle)} className= ".card__button">Change to{!toggle ? "°F" : "°C"}</button>
  </div>
  )
}

export default Card