"use client";
import CardPreview from "@/components/card-preview";
import Topbar from "@/components/top-bar";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES_QUERY = gql`
  query getCountries {
    countries {
      name
      capital
      currency
      emoji
    }
  }
`;

const dummyCountry = [
  {
    name: "Switzerland",
    capital: "Bern",
    currency: "CHE,CHF,CHW",
    emoji: "🇨🇭",
    __typename: "Country",
  },
];

const Home = () => {
  // const { data, loading } = useQuery(GET_COUNTRIES_QUERY);

  // if (loading) return <p>loading</p>;

  return (
    <div className="relative min-h-screen text-gray-400">
      <Topbar />
      <ul className="py-24 flex flex-col space-y-4 w-full items-center">
        {dummyCountry.map((country) => (
            <CardPreview
              key={country.name}
              capital={country.capital}
              code={country.emoji}
              currency={country.currency}
              name={country.name}
            />
        ))}
      </ul>
    </div>
  );
};

export default Home;
