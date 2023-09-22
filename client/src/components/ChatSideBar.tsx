"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="w-full h-screen p-4 text-muted bg-secondary-foreground">
      <Link href="/">
        <Button variant="secondary" className="w-full">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-primary text-primary-foreground": chat.id === chatId,
                "hover:text-secondary active:scale-95 transition-transform duration-75":
                  chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-muted flex-wrap">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/" className="hover:text-primary">
            Docs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
