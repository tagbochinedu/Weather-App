import { SearchIcon } from "@heroicons/react/solid";
const Search = () => {
  return (
    <>
      <div className="my-12 border-4 border-white w-9/12 md:w-7/12 mx-auto flex justify-center rounded-3xl">
        <input
          type="text"
          className="form-control w-10/12 md:w-11/12 px-3 py-2 text-white placeholder-current text-lg  font-semibold rounded-3xl transition ease-in-out rounded-2xl bg-inherit capitalize outline-none"
          placeholder="Search"
        />
        <div className='w-2/12 md:w-1/12 bg-white rounded-r-2xl '>
          <SearchIcon className="w-12 h-12 text-sunrise mx-auto hover:cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Search;
