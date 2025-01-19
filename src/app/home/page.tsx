"use client";
import CardPreview from "@/components/card-preview";
import LoadingIndicator from "@/components/loading-indicator";
import Modal from "@/components/modal";
import Topbar from "@/components/top-bar";
import { useCountry } from "@/hooks/use-country";
import { useModal } from "@/hooks/use-modal";
import { gql, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

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
  {
    name: "Switzerland",
    capital: "Bern",
    currency: "CHE,CHF,CHW",
    emoji: "🇨🇭",
    __typename: "Country",
  },
  {
    name: "Switzerland",
    capital: "Bern",
    currency: "CHE,CHF,CHW",
    emoji: "🇨🇭",
    __typename: "Country",
  },
  {
    name: "Switzerland",
    capital: "Bern",
    currency: "CHE,CHF,CHW",
    emoji: "🇨🇭",
    __typename: "Country",
  },
  {
    name: "Switzerland",
    capital: "Bern",
    currency: "CHE,CHF,CHW",
    emoji: "🇨🇭",
    __typename: "Country",
  },
  {
    name: "Switzerland",
    capital: "Bern",
    currency: "CHE,CHF,CHW",
    emoji: "🇨🇭",
    __typename: "Country",
  },
];

const Home = () => {
  const { data, loading } = useQuery(GET_COUNTRIES_QUERY);
  const { isModalOpen, handleIsModalChange } = useModal();
  const { country, fetchCountry } = useCountry();
  const {data: session} = useSession();

  console.log(session)

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="relative min-h-screen lg:px-4 text-gray-400">
      <Modal modalContent={country} open={isModalOpen} onOpenChange={handleIsModalChange} />
      <Topbar />
      <ul className="py-24 w-full grid grid-cols-1 md:px-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.countries.map((country, index) => (
          <CardPreview
            key={index}
            capital={country.capital}
            code={country.emoji}
            currency={country.currency}
            name={country.name}
            handleIsModalOpen={handleIsModalChange}
            handleFetchCountry={fetchCountry}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
