import { AppSheet, LoadingIndicator } from "@/components";
import { FC, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cleanText } from "@/lib/utils";

interface ChatbotValue {
  open: boolean;
  onOpenChange: () => void;
}

type contentDataType = {
  content: string;
};

interface ChatHistoryValue {
  isRoleUser: boolean;
  message: string;
  timestamp: Date;
}

const baseUrl = "http://localhost:3000";

const Chatbot: FC<ChatbotValue> = ({ open, onOpenChange }) => {
  const { register, handleSubmit, resetField } =
    useForm<contentDataType>();
  const [isGeneratedTextLoading, setIsGeneratedTextLoading] =
    useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryValue[] | []>([]);
  const [streamingChat, setStreamingChat] = useState<string>("");
  const [isStreamingLive, setIsStreamingLive] = useState<boolean>(false);
  const bottomChatRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    bottomChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isGeneratedTextLoading]);

  useEffect(() => {
    console.log(chatHistory);
  }, [chatHistory]);

  const onSubmit: SubmitHandler<contentDataType> = async (data: {
    content: string;
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
      setIsStreamingLive(true);

      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: data.content }),
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;

      const systemChat: ChatHistoryValue = {
        isRoleUser: false,
        message: "",
        timestamp: new Date(),
      };

      setIsGeneratedTextLoading(false);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk
          .split("\n")
          .filter((line) => line.startsWith("data: "));
        for (const line of lines) {
          const content = line.replace(/^data: /, "").trim();
          setStreamingChat((prev) => (prev += content.concat(" ")));
          systemChat.message += content.concat(" ");
        }
      }

      systemChat.message = cleanText(systemChat.message);
      setIsStreamingLive(false);
      setChatHistory((prev) => [...prev, systemChat]);
      setStreamingChat("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AppSheet title="" open={open} onOpenChange={onOpenChange}>
      <>
        <ScrollArea className=" mt-4 flex flex-col h-full scrollbar-hide">
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
          {isGeneratedTextLoading && isStreamingLive ? (
            <span>
              <LoadingIndicator variants="dots" />
            </span>
          ) : !isGeneratedTextLoading && isStreamingLive ? (
            <p className="mr-auto text-left w-fit mb-4 p-2 bg-gray-200 text-gray-500 rounded-lg">
              {streamingChat}
            </p>
          ) : (
            <></>
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
          <Button type="submit">
            <Send />
          </Button>
        </form>
      </>
    </AppSheet>
  );
};

export default Chatbot;
