import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

type SearchContextValue = {
  searchValue: string;
  handleSearchValueChange: (value: string) => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider = ({ children }: { children: ReactElement }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchValueChange: (value: string) => void = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <SearchContext.Provider value={{ searchValue, handleSearchValueChange }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) throw new Error("useSearch should be within SearchContext");

  return context;
};
