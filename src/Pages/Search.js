import { SearchIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/solid";
import { useAuth } from "../Context/ForecastContext";

const Search = () => {
  const {submitHandler, setCity, data, setSearchLoader, searchLoader} = useAuth()
  

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
          ""
        )}
      </div>
    </>
  );
};

export default Search;
