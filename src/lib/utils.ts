import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { code } from "country-emoji";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addClient = (uri: string) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return client;
};

export const cleanText = (string: string) =>
  string
    .replace(/\s*'\s*/g, "'") // Removes spaces around apostrophes (fixes "I 'm" to "I'm")
    .replace(/\s*"\s*/g, '"') // Fixes the space around quotation marks
    .replace(/\s*,\s*/g, ", ") // Fixes spacing around commas
    .replace(/\s*"\s*/g, '"') // Fixes double spaces after quotes
    .replace(/\s*\.\s*/g, ". ") // Corrects spacing around the period
    .replace(/\s*\?\s*/, "? ") // Corrects spacing around the question mark
    .replace(/\s*\!\s*/, "! ") // Corrects spacing around the exclamation mark
    .replace(/\s*:\s*/, ":") // Fixes spaces around colon (Grace : becomes Grace:)
    .replace(/\s*(\w)\s+(?=\d)/g, "$1$2"); // Prevents spaces between digits

export const convertEmojiToIso = (emoji: any) => code(emoji);
