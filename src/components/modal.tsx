import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Globe, DollarSign, Languages, Frame } from "lucide-react";
import { FC } from "react";
import UserAvatar from "./user-avatar";
import { convertEmojiToIso } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { CountryValue } from "@/app/types";

interface IModal {
  open: boolean;
  onOpenChange: () => void;
  modalContent: CountryValue | null;
}

const Modal: FC<IModal> = ({ onOpenChange, open, modalContent }) => {
  if (!modalContent) return <></>;
  const { capital, continent, currency, emoji, languages, name, subdivisions } =
    modalContent;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <UserAvatar
            src={`https://flagcdn.com/w40/${convertEmojiToIso(
              emoji
            )?.toLowerCase()}.png`}
            alt={`${emoji} flag icon`}
            fallback={emoji}
          />
          <div className="flex items-baseline space-x-1">
            <DialogTitle className="text-2xl">{name}</DialogTitle>
            <span className="text-2xl text-gray-400">{emoji}</span>
          </div>
        </DialogHeader>
        {/* <Separator /> */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="flex flex-col items-center bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-0.5 text-gray-400">
              <MapPin className="size-4" />
              <h2 className="text-lg">Capital</h2>
            </div>
            <p>{capital}</p>
          </li>

          <li className="flex flex-col items-center bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-0.5 text-gray-400">
              <Globe className="size-4" />
              <h2 className="text-lg">Continent</h2>
            </div>
            <p>{continent.name}</p>
          </li>

          <li className="flex flex-col items-center bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-0.5 text-gray-400">
              <DollarSign className="size-4" />
              <h2 className="text-lg">Currency</h2>
            </div>
            <p className="text-wrap">{currency}</p>
          </li>

          <li className="flex flex-col items-center bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-0.5 flex-wrap text-gray-400">
              <Languages className="size-4" />
              <h2 className="text-lg">Language</h2>
            </div>
            <p>{languages.map((language) => language.name).toString()}</p>
          </li>

          <li className="flex flex-col items-center col-span-2 bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-0.5 text-gray-400">
              <Frame className="size-4" />
              <h2 className="text-lg">Subdivision</h2>
            </div>
            <p>
              {subdivisions.length < 1 ? "no data found." : subdivisions.map((subdivision) => subdivision.name).toString()}
            </p>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
