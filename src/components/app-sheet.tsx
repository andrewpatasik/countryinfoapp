"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FC, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface ISheet {
  open: boolean;
  onOpenChange: () => void;
}

const baseUrl = "http://localhost:3000";

type contentDataType = {
  content: any
}

const AppSheet: FC<ISheet> = ({ onOpenChange, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<contentDataType>();
  const [generatedText, setGeneratedText] = useState([]);

  // useEffect(() => {console.log(generatedText)}, [generatedText]);

  const onSubmit:SubmitHandler<contentDataType> = async (data: { content: any }) => {
    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: data.content }),
      });

      const text = await response.json();

      setGeneratedText(text.messages);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Ask About Country!</SheetTitle>
        </SheetHeader>
        <p>
          {generatedText.reduce((collection, item) => {
            return new String(collection).concat(item);
          }, new String(""))}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end h-full pb-12"
        >
          <div className="w-full flex space-x-2 mt-auto">
            <Input
              type="text"
              {...register("content", { required: true })}
              id="content"
            />
            {errors.content && (
              <span className="error">Prompt is required</span>
            )}
            <Button type="submit">
              <Send />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AppSheet;
