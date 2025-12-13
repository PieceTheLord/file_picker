"use client";
import { client } from "./clientAppwrite";
import { Account } from "appwrite";
import { getCookie } from "cookies-next";
export const getLoggedInUser = async () => {
  const session: string | undefined = await getCookie("appwrite-session");
  console.log(session);
  if (!session) return null;

  client.setSession(session);
  const account = new Account(client);
  return await account.get();
};
