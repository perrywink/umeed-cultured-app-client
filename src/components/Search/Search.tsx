import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const Search = () => {
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setMobile(true);
      if (window.innerWidth >= 768) {
        setMobile(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      {mobile ? (
        <div className="flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-7 text-gray-500" />
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center mx-10">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-7 text-gray-500" />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow-md block w-full pl-10 p-2.5"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
