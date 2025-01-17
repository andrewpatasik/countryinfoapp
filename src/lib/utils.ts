import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ApolloClient, InMemoryCache} from "@apollo/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addClient = (uri:string) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache()
  })

  return client;
};