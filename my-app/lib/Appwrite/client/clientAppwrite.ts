import { Account, Client, Databases, Functions, Storage } from "appwrite";

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const database = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const account = new Account(client);
