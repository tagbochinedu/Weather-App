import Sun from "../Components/Icons/Sun";
import { useAuth } from "../Context/ForecastContext";

const Home = () => {
  const { locationData } = useAuth();
  return (
    <>
      <div className="pt-12 text-white">
        <div className="">
          <ul>
            {locationData.map((data) => {
              console.log(locationData);
              return (
                <div key={data.name}>
                  <p className="text-center text-2xl font-bold">
                    {data.name}, {data.country}
                  </p>
                  <p>{data.temp}C</p>
                  <span>Max Temp: {data.max_temp}</span>
                  <span>Min Temp: {data.min_temp}</span>
                  <p>{data.weather}</p>
                  <p>{data.sunrise}</p>
                  <p>{data.sunset}</p>
                  <p>{data.date}</p>
                  <div></div>
                </div>
              );
            })}
          </ul>
          <Sun />
        </div>
      </div>
    </>
  );
};

export default Home;
