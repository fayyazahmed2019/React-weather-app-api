
import React, { useState, useEffect } from "react";

import "./App.css";

function App() {

  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);
  
  
  useEffect(() => {
    ifClicked(); ///body unload like html

  }, []);

  


  const handleKeyPress = (event) => {
 
    if(event.key === 'Enter'){
      ifClicked();
      console.log('enter press here! ')
    }
  }


  function ifClicked() {

    
    //http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID={b8bfbb82da2429f55a1829897db10edf}&units=metric`

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=4810f47e4bad8a22a223fc5cb9121a3d&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
            weather.useState("");
            return alert("Oops, there seems to be an error!(wrong location)");
           
          }

          alert("Oops, there seems to be an error!");
          weather.useState("");

          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=gb7FcIEcudRcPmgUmZSzyAQMKc3-QkJlksIOigygiNE`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          
            onKeyDown={handleKeyPress}
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;