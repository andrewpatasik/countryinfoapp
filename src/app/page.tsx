"use client";
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

const Home = () => {
  const { data, loading } = useQuery(GET_COUNTRIES_QUERY);

  if (loading) return <p>loading</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
      <h1 className="text-3xl font-bold">Home</h1>
      <ul>
        {data.countries.map((country: any) => (
          <li>
            <p>{country.name}</p>
            <p>{country.capital}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
