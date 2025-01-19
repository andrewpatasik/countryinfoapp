import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ApolloClient, InMemoryCache} from "@apollo/client";
import { code } from 'country-emoji';
import OpenAI from 'openai';

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

export const convertEmojiToIso = (emoji:any) => code(emoji)