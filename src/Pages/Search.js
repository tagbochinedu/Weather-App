import { SearchIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";
import { useAuth } from "../Context/ForecastContext";

const Search = () => {
  const { submitHandler, setCity, data, setSearchLoader, searchLoader } =
    useAuth();

  const changeHandler = (e) => {
    setSearchLoader(true);
    setCity(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="my-12 border-4 border-white w-9/12 md:w-7/12 mx-auto flex justify-center rounded-3xl"
      >
        <input
          type="text"
          className="form-control w-10/12 md:w-11/12 px-3 py-2 text-white placeholder-current text-lg  font-semibold rounded-3xl transition ease-in-out rounded-2xl bg-inherit capitalize outline-none"
          placeholder="Search"
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="w-2/12 md:w-1/12 bg-white rounded-r-2xl"
        >
          <SearchIcon className="w-12 h-12 text-sunrise mx-auto" />
        </button>
      </form>

      <div className="h-full flex justify-center items-center">
        {searchLoader ? (
          <SunIcon className="animate-spin text-white w-16 h-16" />
        ) : (
          <ul>
            {data.map((city) => {
              return (
                <div className="glass p-6 md:w-96  mt-10 mx-5  text-[color:white] rounded-lg border shadow-md sm:p-8  dark:border-gray-700" key={city.name}>
                  <div className="grid  grid-cols-2  md:gap-40 mb-20">
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
                  <div className="grid  grid-cols-2 gap-20  md:gap-40 mt-10">
                    <div>
                      <h5 className=" text-base   text-white">
                        SunRise
                      </h5>
                      <p className=" md:text-xl  text-lg text-white">
                        {city.sunrise}
                      </p>
                    </div>
                    <div>
                      <h5 className=" text-base   text-white">
                        SunSet
                      </h5>
                      <p className=" md:text-lg text-lg text-white">
                        {city.sunset}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
