"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface ISheet {
  open: boolean;
  onOpenChange: () => void;
}

const baseUrl = "http://localhost:3000";

const AppSheet: FC<ISheet> = ({ onOpenChange, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [generatedText, setGeneratedText] = useState('');

  const onSubmit = async (data: { content: any }) => {
    try {
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: data.content }),
      });

      for await (const chunk of response.body) {
        const data = await chunk.json();
        setGeneratedText((prevText) => prevText + data.content);
      }
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
        <p>{generatedText}</p>
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
