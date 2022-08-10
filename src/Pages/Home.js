import {
  SunIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { useAuth } from "../Context/ForecastContext";
import { useAuth1 } from "../Context/CitiesContext";
import Footer from '../Components/Footer'
import Display from "../Components/Display";

const Home = () => {
  const { display } = useAuth();
  const { data } = useAuth1();
  return (
    <>
      <div className="pt-8 text-white ">
        {!display ? <div className='flex justify-center items-center'><h1 className='text-2xl text-center text-white'>To view your current weather info, please permit the site to access your location</h1></div> : <Display/>}
        <div className="">
          <h1 className="text-4xl mt-24 text-white text-center font-bold mb-6">
            {" "}
            Major Cities In Africa
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
