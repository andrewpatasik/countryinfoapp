import { CountryValue } from "@/app/types";
import { gql, useLazyQuery } from "@apollo/client";
import { createContext, ReactElement, useContext, useState } from "react";

type CountryContextValue = {
  fetchCountry: (countryCode: string) => Promise<void>;
  country: CountryValue | null;
};

const GET_COUNTRY_QUERY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      emoji
      capital
      currency
      languages {
        name
        native
      }
      continent {
        name
      }
      subdivisions {
        name
      }
    }
  }
`;

const CountryContext = createContext<CountryContextValue | null>(null);

export const CountryProvider = ({ children }: { children: ReactElement }) => {
  const [country, setCountry] = useState(null);
  const [getCountry] = useLazyQuery(GET_COUNTRY_QUERY);

  const fetchCountry = async (countryCode: string) => {
    try {
      const res = await getCountry({
        variables: {
          code: countryCode,
        },
      });

      if (res.error) throw new Error(res.error.message);

      setCountry(res.data.country);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CountryContext.Provider value={{ fetchCountry, country }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context) throw new Error("useCountry should be within CountryContext");

  return context;
};
