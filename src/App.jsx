
import React, {useState, useEffect } from 'react'
import axios, { all } from 'axios'
import Card from './Componets/card'
import {   
  thunderstormSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  atmosphereSvg,
  clearSvg,
  cloudSvg

} from "./assets//Imagine"
import './App.css'

const key = "0d4e3c39bd88b2848539dff193666327"
const url = "https://api.openweathermap.org/data/2.5/weather"

const initialState = {
  latitude: 0,
  longitude: 0,
}

const conditionCodes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804]
}

const icons = {
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear: clearSvg,
  clouds: cloudSvg
}
 
function App() {
  const [coords,  setCoords] = useState(initialState)
  const [weather, setWeather] = useState({})
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    (navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
     
      setCoords({ latitude, longitude });

    },  (error) => {
      console.log("No aceptaste la ubicación");
    } ) );

  }, [])

  useEffect(() => {
    if (coords) {

      axios.get(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`) 
      .then((response) => {
        

        const key = Object.keys(conditionCodes)
        const iconName = key.find((key) => conditionCodes[key].includes(response.data?.weather[0]?.id));

        setWeather({
          city: response.data?.name,
          country: response.data?.sys?.country,
          icon: icons[iconName],
          main: response.data?.weather[0]?.main,
          wind: response.data?.wind?.speed,
          clouds: response.data?.clouds?.all,
          pressure: response.data?.main?.pressure,
          temperature: parseInt(response.data?.main?.temp - 273.15)
        
        })
      })  
      .catch((error) => {
        console.log(error)

      })
      
    }
   
  }, [coords])

  

  return (
   <Card weather={weather} toggle={toggle} setToggle={setToggle}/>
  )
} 



export default App