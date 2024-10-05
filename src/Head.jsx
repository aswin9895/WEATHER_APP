import React, { useState } from 'react'
import myStyle from './style.module.css'
import axios from "axios";



const Head = () => {

  const [city, setCity] = useState("") // for getting city name and updating city name
  const [weatherr, setWeather] = useState("") //for getting details after fetching
  const [time, setTime] = useState("")

  // fetching data from api
  const fetchDetails = async () => {
    if (city) {
      try {
        const response = await axios({
          method: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
        })
        setWeather(response.data)
        console.log(weatherr);

      } catch (error) {
        alert("City not Found!!!")
      }
      // date function
      const today = new Date()
      const result = today.toLocaleString('en-US', { timeZoneName: 'short' })
      setTime(result)
      console.log(time);

    } else {
      alert("Please Fill The Form Completely!!!")
    }


  }

  // get value from input
  const getCity = (inputTag) => {
    const { value } = inputTag
    console.log(value);
    setCity(value)
  }





  return (
    <>
      <div className='d-flex flex-wrap justify-content-center w-100 align-items-center container py-5'>
        <div>
          <input onChange={e => getCity(e.target)} className='text-center fs-5 text-dark py-1 border-none' type="text" placeholder='Enter The City' name='searchCity' />
          <button onClick={fetchDetails} className={myStyle.buttonheader}><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center w-100 align-items-center container'>
        <h1 style={{fontSize:"80px",color:"lightcyan"}} className='fw-bolder'>{weatherr.name}</h1>
        <p className={myStyle.time}>{time}</p>
      </div>
      {/* body  */}

      <div className='d-flex flex-wrap justify-content-evenly w-100 align-items-center container py-3'>
        <div className='d-flex align-items-end me-5 pe-5'>
          {
            weatherr && (
              <h1 className={myStyle.bodyhead}>{weatherr.main.temp}</h1>
            )
          }
          <div className='d-flex flex-column'>
            {
              weatherr && (
                <h5 className={myStyle.bodydegree}>&deg; C</h5>
              )
            }
            {
              weatherr && (
                <p className={myStyle.bodycloudstatus}>{weatherr.weather?.map(item=>item.description)}</p>
              )
            }
          </div>
        </div>
        <div className='d-flex ps-5  align-items-center ms-5 mt-sm-5'>
          {/* {
            weatherr&&(
              <img style={{ width: "150px", height: "150px", border: "solid", marginRight: "20px" }} src={weatherr.weather?.forEach(item=>item.icon)} alt="noimg" />
            )
          } */}
          {
            weatherr&&(
              <div className={myStyle.bodyimgdiv}>
            <p><i className="fa-solid fa-temperature-quarter"></i> Feels Like: <span>{weatherr.main.feels_like} &deg;C</span></p>
            <p><i className="fa-solid fa-droplet"></i> Humidity: <span>{weatherr.main.humidity}%</span></p>
            <p><i className="fa-solid fa-wind"></i> Wind: <span>{weatherr.wind.speed} km/h</span></p>
            <p><i className="fa-solid fa-tornado"></i> Pressure: <span>{weatherr.main.pressure}</span></p>
          </div>
            )
          }
        </div>
      </div>

      {/* bottom */}
      <div className={myStyle.footmaindiv}>
        {
          weatherr && (
            <div className={myStyle.footdiv}>
              <div>
                <h5 className={myStyle.footh5}>Country</h5>
                <p className={myStyle.footp}>{weatherr.sys.country}</p>
              </div>
              <div>
                <h5 className={myStyle.footh5}>Latitude</h5>
                <p className={myStyle.footp}>{weatherr.coord.lat}</p>
              </div> <div>
                <h5 className={myStyle.footh5}>Longitude</h5>
                <p className={myStyle.footp}>{weatherr.coord.lon}</p>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Head