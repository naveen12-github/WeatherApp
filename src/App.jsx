import { useState ,useEffect} from 'react';
import './style.css';
/*images*/
import clearimg from './assets/clear.png';
import cloudyimg from './assets/cloudy.png';
import drizzleimg from './assets/drizzle.png';
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import wind from './assets/wind.png'
import searchIcon from './assets/search.png';
import humidity from './assets/humidity.png'
import windspeed from './assets/windspeed.png'

const WeatherDetails =({icon,temp,city,country,lat,log,humiditys,winds})=>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt ="image" style={{width: '160px',height:"160px"}}/>
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div >
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
      <span className='log'>Logitude</span>
      <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
  <div className="element">
    <img src={humidity} alt="Humidity Icon" className="icon" />
    <div className="humidity-percent">{humiditys}%</div>
    <div className="text">Humidity</div>
  </div>
  <div className="element">
    <img src={windspeed} alt="Wind Speed Icon" className="icon" />
    <div className="wind-percent">{winds} Km/h</div>
    <div className="text">Wind Speed</div>
  </div>
</div>

    </>
  )
}

function App() {
  const[text,setText]=useState("chennai")
  const [icon,setIcon]= useState(wind);
  const [temp,setTemp]=useState(25);
  const[city,setCity]=useState("chennai")
  const[country,setCountry]=useState("IN")
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const [humiditys, setHumiditys]=useState(0);
  const [winds,setWinds] = useState(0);

  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const weatherIconMap={
    "01d":clearimg,
    "01n":clearimg,
    "02d":cloudyimg,
    "02n":cloudyimg,
    "03d":drizzleimg,
    "03n":drizzleimg,
    "04d":drizzleimg,
    "04n":drizzleimg,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,
  } 
  const search =async ()=>{
   
    let api_key = 'ddfff234113ecf18532a57684c5844b3';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res= await fetch(url)
      let data= await res.json()
      if(data.cod== "404"){
        console.error("City Not Found")
        setCityNotFound(true)
        setLoading(false)
        return;
      }
     setHumiditys(data.main.humidity);
     setWinds(data.wind.speed)
     setTemp(Math.floor(data.main.temp))
     setCity(data.name)
     setCountry(data.sys.country)
     setLat(data.coord.lat)
     setLog(data.coord.lon)
     const weatherIconCode = data.weather[0].icon;
     setIcon(weatherIconMap[weatherIconCode] || clearimg)
     setCityNotFound(false)

    }catch(error){
     console.error("An error occured:",error.message)
     setError("An error occured while fetching weather data.")
    }finally{
       setLoading(false)
    }
  }
  const handleCity =(e)=>{
  setText(e.target.value)
  }
  const handleKeyDown =(e)=>{
    if(e.key === "Enter"){
      search();
    }
  }
  useEffect(function (){
    search();
  },[]);
  return (
    <div className="container" >
      <div className="input-container">
  <input
    type="text"
    className="cityInput"
    placeholder="Search City"
    onChange={handleCity} value={text} onKeyDown={handleKeyDown}
  />
 <div className="searchIcon" onClick={()=>search()}>
  <img src={searchIcon} alt="search icon" />
</div>

      </div>
     
      {loading && <div className='loading-message'>Loading...</div>}
      { error && <div className='error-message'>{error}</div>}
      {cityNotFound&&<div className='city-not-found'>City not found</div>}
    {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humiditys={humiditys} winds={winds}/>}
     <p className='copyright'>
      Designed by <span>Naveen</span>
     </p>
    </div>
  );
}

export default App;
