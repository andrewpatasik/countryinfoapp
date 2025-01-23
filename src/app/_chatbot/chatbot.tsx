import { AppSheet, LoadingIndicator } from "@/components";
import { FC, useEffect, useRef, useState } from "react";
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
  const bottomChatRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
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

      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: data.content }),
      });
      const payload = await response.json();
      setIsGeneratedTextLoading(false);
      setChatHistory((prev) => [...prev, payload.data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AppSheet
      title=""
      open={open}
      onOpenChange={onOpenChange}
    >
      <ScrollArea className="flex flex-col h-full scrollbar-hide">
        {chatHistory.map((chat, index, row) => (
          <p
            key={index}
            className={`${
              !chat.isRoleUser ? "mr-auto text-left" : "ml-auto text-right"
            } w-fit mb-4 p-2 bg-gray-200 text-gray-500 rounded-lg`}
            ref={index + 1 === row.length ? bottomChatRef : null}
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
