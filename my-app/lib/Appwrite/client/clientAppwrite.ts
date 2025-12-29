import {
  Account,
  Client,
  Databases,
  Functions,
  Storage,
  TablesDB,
} from "appwrite";


export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setDevKey(process.env.APPWRITE_SERVER_API_KEY!);



export const database = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const account = new Account(client);
