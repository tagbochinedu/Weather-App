import {
  SunIcon,
  CloudIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { useAuth } from "../Context/ForecastContext";
import { useAuth1 } from "../Context/CitiesContext";
import Footer from '../Components/Footer'

const Home = () => {
  const { locationWeather, weeklyWeather, dusk } = useAuth();
  const { data } = useAuth1();
  return (
    <>
      <div className="pt-8 text-white ">
        <div className="md:pl-12 pl-2">
          <ul>
            {locationWeather.map((data) => {
              return (
                <div key={data.name}>
                  <p className="text-xl font-semibold">
                    {data.name}, {data.country}
                  </p>
                  <div className="flex items-center justify-between overflow-x-hidden">
                    <div className="md:w-4/12">
                      <p className="text-6xl font-bold mb-4">{`${
                        data.temp
                      }${"\u2103"}`}</p>
                      <div>
                        <p>
                          <span className="font-bold">
                            {data.weather === "Clouds"
                              ? " Cloudy"
                              : data.weather === "sunny"
                              ? "Sunny"
                              : data.weather === "Rain"
                              ? "Rainy"
                              : ""}
                          </span>
                        </p>
                        <p className="font-semibold">{data.weatherDesc}</p>
                      </div>

                      <p>Sunrise: {data.sunrise}</p>
                      <p>Sunset: {data.sunset}</p>
                    </div>

                    <div className=" md:w-6/12">
                      {dusk ? (
                        <MoonIcon className="w-48 h-48 md:h-96 md:w-96 text-white rotate-270" />
                      ) : (
                        <SunIcon className="w-48 h-48 md:h-96 md:w-96 text-white rotate-270" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="md:mt-24 mt-28 ">
          <h1 className="text-4xl mt-24 text-white text-center font-bold mb-6">
            Weekly Forecast
          </h1>
          <div className="border-y border-y-white md:my-auto md:flex  md:px-12 px-2 py-2">
            <div className="flex md:block md:w-2/12 justify-between items-center md:text-left md:text-lg font-semibold">
              <p className="w-2/12 md:w-full text-center">Date</p>
              <p className="w-2/12 md:w-full text-center">Weather Forecast</p>
              <p className="w-2/12 md:w-full text-center">Day Temp</p>
              <p className="w-2/12 md:w-full text-center">Night Temp</p>
            </div>
            <ul className="overflow-x-auto whitespace-nowrap ... scrollbar-hide w-full">
              {weeklyWeather.map((week) => {
                return (
                  <div
                    className="md:w-1/4 text-center flex justify-between items-center md:inline-block md:border-l-2 md:border-white my-0.5"
                    key={week.date}
                  >
                    <p className="w-2/12 md:w-full text-center text-lg font-semibold">
                      {week.date}
                    </p>
                    <p className="w-2/12 md:w-full">
                      {week.weather === "Clouds" ? (
                        <CloudIcon className="md:w-full h-8 w-8 text-white mx-auto" />
                      ) : week.weather === "sunny" ? (
                        <SunIcon className="md:w-full h-8 w-8 text-white mx-auto" />
                      ) : week.weather === "Rain" ? (
                        <ion-icon
                          name="rainy-outline"
                          size="large"
                          className="text-white"
                        ></ion-icon>
                      ) : (
                        ""
                      )}
                    </p>
                    <p className="w-2/12 md:w-full text-center text-lg font-semibold">{`${
                      week.day_temp
                    }${"\u2103"}`}</p>
                    <p className="w-2/12 md:w-full text-center text-lg font-semibold">{`${
                      week.night_temp
                    }${"\u2103"}`}</p>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="">
          <h1 className="text-4xl mt-24 text-white text-center font-bold mb-6">
            {" "}
            Major Cities Around The World
          </h1>
          <div className="h-full  items-center px-4">
            {
              <ul className="flex justify-between flex-wrap">
                {data.map((city) => {
                  return (
                    <div
                      className={`${"glass p-6 md:w-96  mt-10 mx-5  text-[color:white] rounded-lg border shadow-md sm:p-8  border-none shadow-lg shadow-black"} ${
                        city.dusk
                          ? "bg-gradient-to-bl from-midnight to-dawn"
                          : "bg-gradient-to-bl from-sunrise to-sunset"
                      }`}
                      key={city.name}
                    >
                      <div className="grid  grid-cols-2  md:gap-40">
                        <div>
                          <h5 className=" text-4xl font-bold pb-2 text-white dark:text-white">
                            {city.name}
                          </h5>
                          <p className=" text-xl text-base text-white">
                            {`${city.temp} \u00B0C`}
                          </p>
                        </div>
                        <div className="md:pt-5 pt-10 pl-20 md:pl-20  ">
                          <p className=" text-2xl text-base rotate-90  text-white">
                            {city.weatherDesc}
                          </p>
                        </div>
                      </div>
                      <div>
                        {city.dusk ? (
                          <MoonIcon className="h-24 w-24" />
                        ) : (
                          <SunIcon className="h-24 w-24" />
                        )}
                      </div>
                      <div className="grid  grid-cols-2 gap-20  md:gap-40 mt-10">
                        <div>
                          <h5 className=" text-base   text-white">Max Temp</h5>
                          <p className=" md:text-xl  text-lg text-white">
                            {`${city.max_temp} \u00B0C`}
                          </p>
                        </div>

                        <div>
                          <h5 className=" text-base   text-white">Min Temp</h5>
                          <p className=" md:text-lg text-lg text-white">
                            {`${city.min_temp} \u00B0C`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ul>
            }
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
