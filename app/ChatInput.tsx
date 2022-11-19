"use client";

import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);


  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    setInput("");

    const message: Message = {
      id: uuidv4(),
      message: input,
      created_at: Date.now(),
      username: "Elon Musk",
      profilePic:
        "https://scontent.fadl7-1.fna.fbcdn.net/v/t1.6435-9/90920035_10206606580800340_5302356234668605440_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=jCrh0AE9xd4AX-u0hPi&_nc_ht=scontent.fadl7-1.fna&oh=00_AfDUO2EQieI0IiZoGEsVF3OYPvGxf6C8pVzonxKybyTHOg&oe=639DA282",
      email: "shawn1876@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
    // uploadMessageToUpstash();
  };

  return (
    <form
      onSubmit={addMessage}
      className="bg-white fixed bottom-0 z-50 w-full flex px-10 py-5 border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none
      focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3
      disabled:opacity-50 disabled:cursor-not-allowed
      "
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
        py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
