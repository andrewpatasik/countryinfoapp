"use client";
import AppSheet from "@/components/app-sheet";
import CardPreview from "@/components/card-preview";
import LoadingIndicator from "@/components/loading-indicator";
import Modal from "@/components/modal";
import Topbar from "@/components/top-bar";
import { useCountry } from "@/hooks/use-country";
import { useModal } from "@/hooks/use-modal";
import { useSheet } from "@/hooks/use-sheet";
import { toast } from "@/hooks/use-toast";
import { gql, useQuery } from "@apollo/client";
import { Sparkle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

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
  const { isSheetOpen, handleIsSheetChange } = useSheet();
  const { country, fetchCountry } = useCountry();
  const { data: session } = useSession();

  useEffect(() => {
    if (session)
      toast({
        title: "You are successfully logged in. Welcome!",
      });
  }, [session]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="relative min-h-screen lg:px-4 text-gray-400">
      <Modal
        modalContent={country}
        open={isModalOpen}
        onOpenChange={handleIsModalChange}
      />
      <AppSheet open={isSheetOpen} onOpenChange={handleIsSheetChange} />
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

      <div className="fixed bottom-24 md:bottom-10 right-10 z-50">
        <button
          onClick={handleIsSheetChange}
          className="flex flex-col items-center space-y-2 text-sm text-indigo-500"
        >
          <div className="bg-indigo-100 rounded-full p-4">
            <Sparkle className="size-8 " />
          </div>
          <span className="bg-indigo-100 py-0.5 px-3.5 rounded-full">
            Ask AI
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
