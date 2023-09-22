"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import MessageList from "@/components/MessageList";

type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="relative max-h-screen overflow-scroll">
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>
      {/* messages list */}
      <MessageList messages={messages} />
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 "
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full"
          />
          <Button
            variant="default"
            size="icon"
            className="ml-2 active:scale-95 transition-transform duration-75 group"
          >
            <Send className="h-4 w-4 group-hover:scale-110 duration-150 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
