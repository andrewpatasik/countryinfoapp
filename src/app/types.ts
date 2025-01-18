export type CountryValue = {
  name: string;
  capital: string;
  currency: string;
  emoji: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
    native: string;
  }[];
  subdivisions: {
    name: string;
  }[];
};
