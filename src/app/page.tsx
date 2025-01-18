"use client";
import CardPreview from "@/components/card-preview";
import Modal from "@/components/modal";
import Topbar from "@/components/top-bar";
import { useModal } from "@/hooks/use-modal";
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
  const { isModalOpen, handleIsModalChange } = useModal();

  // if (loading) return <p>loading</p>;

  return (
    <div className="relative min-h-screen text-gray-400">
      <Modal open={isModalOpen} onOpenChange={handleIsModalChange} />
      <Topbar />
      <ul className="py-24 flex flex-col space-y-4 w-full items-center">
        {dummyCountry.map((country) => (
          <CardPreview
            key={country.name}
            capital={country.capital}
            code={country.emoji}
            currency={country.currency}
            name={country.name}
            handleIsModalOpen={handleIsModalChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
