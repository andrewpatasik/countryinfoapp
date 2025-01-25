"use client";
import { Search } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "./ui/input";
import _ from "lodash";

const Topbar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    console.log(searchValue)
  }, [searchValue]);

  useEffect(() => {
    const debouncedSearchInput = _.debounce(
      () => setSearchValue(searchInput),
      1000
    );
    debouncedSearchInput();

    return () => {
      debouncedSearchInput.cancel();
    };
  }, [searchInput]);

  const handleOnChange: FormEventHandler = (event) => {
    const target = event.target as HTMLInputElement;
    setSearchInput(target.value);
  };

  return (
    <section className="fixed md:sticky flex z-10 justify-between top-0 left-0 right-0 w-full py-4 bg-white">
      <div className="mx-auto w-11/12 lg:w-2/5">
        <form onChange={handleOnChange} noValidate>
          <div className="relative flex flex-col justify-center">
            <Search className="absolute ml-2" />
            <Input
              onChange={handleOnChange}
              value={searchInput}
              className="pl-10"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Topbar;
