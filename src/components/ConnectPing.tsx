"use client";
import { client } from "@/lib/appwrite";

export const ConnectPing = () => {
  const sendPing = async () => {
    const response = await client.ping();
    console.info(response);
  };
  return <button onClick={sendPing}>Send Ping</button>;
};
