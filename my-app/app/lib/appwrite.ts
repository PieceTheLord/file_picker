import {
  Client,
  Account,
  Databases,
  Storage,
  Functions,
  Messaging,
  TablesDB,
} from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient(): Promise<{
  account: Account;
  storage?: Storage;
  database?: Databases;
  functions?: Functions;
  messaging?: Messaging;
} | null> {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  // IMPORTANT: In Next.js 16, cookies() is async.
  const session = (await cookies()).get("appwrite-session");

  if (!session || !session.value) {
    return null;
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get database() {
      return new Databases(client);
    },
    get functions() {
      return new Functions(client);
    },
    get messaging() {
      return new Messaging(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_SERVER_API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get storage() {
      return new Storage(client);
    },
    get database() {
      return new Databases(client);
    },
    get functions() {
      return new Functions(client);
    },
    get messaging() {
      return new Messaging(client);
    },
    get client() {
      return client;
    },
  };
}

export async function getTable() {
  const { client } = await createAdminClient();

  return {
    get table() {
      return new TablesDB(client);
    },
  };
}

// This is a "Factory Function". It builds a fresh client for the specific request.
export async function getLoggedInUser() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const cookieStore = await cookies(); // In Next.js 15, this is async!
  const session = cookieStore.get("appwrite-session");

  if (!session) return null;

  client.setSession(session.value);
  const account = new Account(client);

  try {
    // Return the actual User object, so you don't have to fetch it later
    return await account.get();
  } catch (error) {
    console.log("Error in getLoggedInUser", error);
    return null;
  }
}

// Function for Database operations
export async function getDbClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");

  if (session) {
    client.setSession(session.value);
  }

  return new Databases(client);
}
