import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FC } from "react";
import { convertEmojiToIso } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin, ArrowUpRight, DollarSign } from "lucide-react";
import { Separator } from "./ui/separator";

interface ICardPreview {
  currency: string;
  code: string;
  name: string;
  capital: string;
  handleIsModalOpen: () => void;
}

const CardPreview: FC<ICardPreview> = ({
  capital,
  code,
  name,
  currency,
  handleIsModalOpen,
}) => {
  return (
    <Card className="w-11/12 lg:w-2/5">
      <CardHeader className="bg-gray-100 flex flex-row items-center justify-between">
        <Avatar>
          <AvatarImage
            src={`https://flagcdn.com/w40/${convertEmojiToIso(
              code
            )?.toLowerCase()}.png`}
          />
          <AvatarFallback>{code}</AvatarFallback>
        </Avatar>
        <button onClick={() => handleIsModalOpen()}>
          <ArrowUpRight className="text-gray-400 size-8 lg:size-9" />
        </button>
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle>{name}</CardTitle>
        <div className="flex space-x-1 mt-1 items-center">
          <MapPin className="size-4" />
          <p>{capital}</p>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col items-start pt-4">
        <span className="text-sm bg-gray-200 text-gray-600 px-2.5 py-0.5 rounded-full">
          currency
        </span>
        <div className="flex items-center mt-1">
          <DollarSign className="text-teal-500 size-4" />
          <span className="text-gray-500">{currency}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardPreview;
