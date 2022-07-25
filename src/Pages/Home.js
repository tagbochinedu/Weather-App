import Sun from "../Components/Icons/Sun";
import Cloud from "../Components/Icons/Cloud";
import { useAuth } from "../Context/ForecastContext";

const Home = () => {
  const { locationWeather, weeklyWeather } = useAuth();
  return (
    <>
      <div className="pt-6 text-white md:px-6 px-2">
        <div className="">
          <ul>
            {locationWeather.map((data) => {
              return (
                <div key={data.name}>
                  <p className="text-xl font-semibold">
                    {data.name}, {data.country}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="mt-12 md:w-4/12">
                      <p className="text-6xl font-bold mb-4">{`${
                        data.temp
                      }${"\u2103"}`}</p>
                      <div>
                        <p>
                          {" "}
                          It's
                          <span className="font-bold">
                            {data.weather === "Clouds"
                              ? " Cloudy"
                              : data.weather === "sunny"
                              ? "Sunny"
                              : data.weather === "Rain"
                              ? "Raining"
                              : ""}{" "}
                          </span>{" "}
                          outside!!
                        </p>
                        <p className="font-semibold">
                          {data.weather === "Clouds"
                            ? "Excellent weather for a walk"
                            : data.weather === "sunny"
                            ? "Its hot outside!!!"
                            : data.weather === "Rain"
                            ? "A rainy day, I see"
                            : ""}
                        </p>
                      </div>

                      <p>Sunrise: {data.sunrise}</p>
                      <p>Sunset: {data.sunset}</p>
                    </div>
                    <div className="md:static absolute -right-48 top-24 overflow-hidden md:w-4/12">
                      <Sun className={"h:96 w-96 md:h-96 md:w-96 text-white"} />
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="border-y border-y-white md:my-auto mt-24">
          <ul className="overflow-x-auto whitespace-nowrap ... scrollbar-hide">
            {weeklyWeather.map((week) => {
              return (
                <div className="w-96 inline-block" key={week.date}>
                  <p>{week.date}</p>
                  <p>
                    A{" "}
                    {week.weather === "Clouds" ? (
                      <Cloud className={'h-6 w-6 text-white'}/>
                    ) : week.weather === "sunny" ? (
                      <Sun className={'h-4 w-4 text-white'}/>
                    ) : week.weather === "Rain" ? (
                      'rainy'
                    ) : (
                      ""
                    )}{" "}
                    day
                  </p>
                  <p>Day {`${week.day_temp}${"\u2103"}`}</p>
                  <p>Night {`${week.night_temp}${"\u2103"}`}</p>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
