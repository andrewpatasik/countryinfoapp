import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FC } from "react";
import { convertEmojiToIso } from "@/lib/utils";
import { MapPin, ArrowUpRight, DollarSign } from "lucide-react";
import { Separator } from "./ui/separator";
import UserAvatar from "./user-avatar";

interface ICardPreview {
  currency: string;
  code: string;
  name: string;
  capital: string;
  handleIsModalOpen: () => void;
  handleFetchCountry: (countryCode: string) => Promise<void>;
}

const CardPreview: FC<ICardPreview> = ({
  capital,
  code,
  name,
  currency,
  handleIsModalOpen,
  handleFetchCountry,
}) => {
  const countryCode = convertEmojiToIso(code) as string;

  return (
    <Card className="mx-auto w-11/12 md:w-full">
      <CardHeader className="bg-gray-100 py-4 flex flex-row items-center justify-between">
        <UserAvatar
          src={`https://flagcdn.com/w40/${countryCode?.toLowerCase()}.png`}
          alt={`${countryCode} flag icon`}
          fallback={countryCode}
        />
        <button
          onClick={() => {
            handleFetchCountry(countryCode).then((result) =>
              handleIsModalOpen()
            );
          }}
        >
          <ArrowUpRight className="text-gray-400 size-8 hover:text-blue-500 hover:ease-in-out" />
        </button>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <CardTitle>{name}</CardTitle>
        <div className="flex space-x-1 mt-1 items-center">
          <MapPin className="size-4" />
          <p>{capital}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex items-center justify-between pt-4 pb-2">
        <span className="flex items-center text-sm bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full">
          <DollarSign className="text-teal-500 size-4" />
          currency
        </span>
        <div className="flex flex-wrap items-center mt-1 truncate">
          <span className="text-gray-500">{currency}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardPreview;
