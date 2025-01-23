import { AppSheet, LoadingIndicator } from "@/components";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatbotValue {
  open: boolean;
  onOpenChange: () => void;
}

type contentDataType = {
  content: any;
};

interface ChatHistoryValue {
  isRoleUser: boolean;
  message: string;
  timestamp: Date;
}

const baseUrl = "http://localhost:3000";

const Chatbot: FC<ChatbotValue> = ({ open, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<contentDataType>();
  const [isGeneratedTextLoading, setIsGeneratedTextLoading] =
    useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryValue[] | []>([]);

  useEffect(() => {
    const genTextLoadTimeout = setTimeout(
      () => setIsGeneratedTextLoading(false),
      1000
    );

    return () => clearTimeout(genTextLoadTimeout);
  }, [isGeneratedTextLoading]);

  const onSubmit: SubmitHandler<contentDataType> = async (data: {
    content: any;
  }) => {
    resetField("content");

    try {
      const userChat: ChatHistoryValue = {
        isRoleUser: true,
        message: data.content,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, userChat]);
      setIsGeneratedTextLoading(true);

      // const response = await fetch(`${baseUrl}/api/chat`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ messages: data.content }),
      // });
      // const text = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AppSheet
      title="Ask About Country!"
      open={open}
      onOpenChange={onOpenChange}
    >
      <ScrollArea className="flex flex-col h-full">
        {chatHistory.map((chat, index) => (
          <p
            key={index}
            className={`${
              !chat.isRoleUser ? "mr-auto text-left" : "ml-auto text-right"
            } w-fit mb-4 p-2 bg-gray-200 text-gray-500 rounded-lg`}
          >
            {chat.message}
          </p>
        ))}
        {isGeneratedTextLoading && (
          <span>
            <LoadingIndicator variants="dots" />
          </span>
        )}
      </ScrollArea>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex space-x-2 mt-auto pb-8"
      >
        <Input
          type="text"
          {...register("content", { required: true })}
          id="content"
        />
        {errors.content && <span className="error">Prompt is required</span>}
        <Button type="submit">
          <Send />
        </Button>
      </form>
    </AppSheet>
  );
};

export default Chatbot;
