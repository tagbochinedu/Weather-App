import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
const ForecastContext = React.createContext();

export function useAuth() {
  return useContext(ForecastContext);
}

export function AuthProvider({ children }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationWeather, setLocationWeather] = useState([]);
  const [weeklyWeather, setWeeklyWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [dusk, setDusk] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;

  const months = useMemo(() => {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
  }, []);
  const days = useMemo(() => {
    return ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  }, []);

  const TimeCalc = useCallback((timing) => {
    const time = new Date(timing * 1000);
    let hours = time.getUTCHours() + 1;
    const minutes = time.getMinutes();
    if (hours > 12) {
      hours -= 12;
      return `${hours}:${minutes}pm`;
    } else {
      return `${hours}:${minutes}am`;
    }
  }, []);
  const duskCalc = useCallback((timing) => {
    let dusk = [];
    let sunset = [];
    const dusktime = new Date();
    let duskhours = dusktime.getUTCHours() + 1;
    const duskminutes = dusktime.getMinutes();
    dusk = [duskhours, duskminutes];
    const sunsettime = new Date(timing * 1000);
    let sunsethours = sunsettime.getUTCHours() + 1;
    const sunsetminutes = sunsettime.getMinutes();
    sunset = [sunsethours, sunsetminutes];
    return (
      dusk[0] > sunset[0] || (dusk[0] === sunset[0] && dusk[1] > sunset[1])
    );
  }, []);
  const duskCalc2 = useCallback((timing, locale) => {
    let dusk = [];
    let sunrise = []
    let sunset = [];
    const dusktime = new Date();
    const duskforeign = dusktime.toLocaleString("en-US", { timeZone: locale });
    const duskarray = duskforeign.split(",");
    const newtime = duskarray[1];
    const timess = newtime.toString();
    const last = timess.split(":");
    const arr = [last[2]];
    const arr1 = arr[0].split("");
    const arr2 = arr1.slice(2);
    const arr3 = arr2.join("").toString().trim();
    console.log([dusktime, duskforeign]);
    if (arr3 === "PM" || (arr3 === "AM" && parseInt(last[0]) === 12)) {
      console.log(true)
      let num = parseInt(last[0])+12;
      dusk.push(num)
    } else {
      console.log(false)
      dusk.push(parseInt(last[0]));
    } dusk.push(parseInt(last[1]));

    const sunrisetime = new Date(timing * 1000);
    const sunriseforeign = sunrisetime.toLocaleString('en-US', { timeZone: locale });
    const sunrisearray = sunriseforeign.split(",");
    const sunnewtime = sunrisearray[1];
    const suntimess = sunnewtime.toString();
    const sunlast = suntimess.split(":");
    const sunarr = [sunlast[2]];
    const sunarr1 = sunarr[0].split("");
    const sunarr2 = sunarr1.slice(2);
    const sunarr3 = sunarr2.join("").toString().trim();
    console.log(sunarr3)
    sunrise.push(parseInt(sunlast[0]));
    sunrise.push(parseInt(sunlast[1]))
    
    const sunsettime = new Date(timing * 1000);
    const sunsetforeign = sunsettime.toLocaleString('en-US', { timeZone: locale });
    const sunsetarray = sunsetforeign.split(",");
    const snewtime = sunsetarray[1];
    const stimess = snewtime.toString();
    const slast = stimess.split(":");
    const sarr = [slast[2]];
    const sarr1 = sarr[0].split("");
    const sarr2 = sarr1.slice(2);
    const sarr3 = sarr2.join("").toString().trim();
    console.log([sunsettime, sunsetforeign]);
    if (sarr3 === "PM") {
      console.log(true)
      let num = parseInt(slast[0])+12;
      sunset.push(num)
    } else {
      console.log(false)
      sunset.push(parseInt(slast[0]));
    } sunset.push(parseInt(slast[1]));
    console.log([dusk, sunset, sarr3]);
    return (
     (dusk[0] > sunset[0]) || (dusk[0] === sunset[0] && dusk[1] > sunset[1]) || dusk[0] < sunrise[0]
    );
  }, []);
  const DateCalc = useCallback(
    (timing) => {
      let time = "";
      if (timing) {
        time = new Date(timing * 1000);
      } else {
        time = new Date();
      }
      const month = months[time.getMonth()];
      const date = time.getDate();
      const day = days[time.getDay()];
      return `${day}, ${month} ${date}`;
    },
    [days, months]
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const res = await response.json();
      const georesponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${res.coord.lat}&lon=${res.coord.lon}&units=metric&appid=${API_KEY}`
      );
      const res1 = await georesponse.json()
      console.log(res1)
      const resData = [
        {
          dusk: duskCalc2(res.sys.sunset, res1.timezone),
          name: res.name,
          temp: Math.round(res.main.temp),
          min_temp: Math.round(res.main.temp_min),
          max_temp: Math.round(res.main.temp_max),
          country: res.sys.country,
          sunrise: TimeCalc(res.sys.sunrise),
          sunset: TimeCalc(res.sys.sunset),
          weather: res.weather[0].main,
          weatherDesc: res.weather[0].description,
        },
      ];
      setData(resData);
      setSearchLoader(false);
      console.log(res);
      setError(false);
    } catch (error) {
      console.log(error.message);
      setError(true);
      setErrorText(
        "location cannot be found. Check the spelling or search for another location"
      );
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setLoading(false);
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const res = await response.json();
        const res1 = await response1.json();

        const data = [
          {
            dusk: duskCalc(res.sys.sunset),
            country: res.sys.country,
            name: res.name,
            lng: res.coord.lon,
            lat: res.coord.lat,
            sunrise: TimeCalc(res.sys.sunrise),
            sunset: TimeCalc(res.sys.sunset),
            temp: Math.round(res.main.temp),
            date: DateCalc(),
            weather: res.weather[0].main,
            weatherDesc: res.weather[0].description,
          },
        ];
        const weeklyData = [
          {
            date: DateCalc(res1.daily[0].dt),
            day_temp: Math.round(res1.daily[0].temp.day),
            night_temp: Math.round(res1.daily[0].temp.night),
            weather: res1.daily[0].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[1].dt),
            day_temp: Math.round(res1.daily[1].temp.day),
            night_temp: Math.round(res1.daily[1].temp.night),
            weather: res1.daily[1].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[2].dt),
            day_temp: Math.round(res1.daily[2].temp.day),
            night_temp: Math.round(res1.daily[2].temp.night),
            weather: res1.daily[2].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[3].dt),
            day_temp: Math.round(res1.daily[3].temp.day),
            night_temp: Math.round(res1.daily[3].temp.night),
            weather: res1.daily[3].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[4].dt),
            day_temp: Math.round(res1.daily[4].temp.day),
            night_temp: Math.round(res1.daily[4].temp.night),
            weather: res1.daily[4].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[5].dt),
            day_temp: Math.round(res1.daily[5].temp.day),
            night_temp: Math.round(res1.daily[5].temp.night),
            weather: res1.daily[5].weather[0].main,
          },
          {
            date: DateCalc(res1.daily[6].dt),
            day_temp: Math.round(res1.daily[6].temp.day),
            night_temp: Math.round(res1.daily[6].temp.night),
            weather: res1.daily[6].weather[0].main,
          },
        ];
        setWeeklyWeather(weeklyData);
        setDusk(duskCalc(res.sys.sunset));
        setLocationWeather(data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [latitude, longitude, API_KEY, DateCalc, TimeCalc, duskCalc]);

  const value = {
    locationWeather,
    weeklyWeather,
    loading,
    submitHandler,
    setCity,
    setData,
    data,
    searchLoader,
    setSearchLoader,
    setError,
    errorText,
    error,
    dusk,
  };
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
