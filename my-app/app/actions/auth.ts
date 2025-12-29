"use server";

import { createAdminClient } from "../lib/appwrite";
import { cookies } from "next/headers";
import { ID } from "appwrite";
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
  // 1. Use Admin Client to create the session
  const { account } = await createAdminClient();

  // 2. Create session
  const session = await account.createEmailPasswordSession({
    email,
    password,
  });

  // 3. MANUALLY set the cookie so the Server can read it later
  const cookieStore = await cookies();
  cookieStore.set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(session.expire),
  });
  redirect("/home");
}

export async function signup(email: string, password: string) {
  // 1. Use Admin Client to create the session
  const { account } = await createAdminClient();

  // 2. Create the user in AppWrite Authetication interface
  const user = await account.create({ userId: ID.unique(), email, password });

  // 3 Create the session
  const session = await account.createEmailPasswordSession({ email, password });

  // 4. MANUALLY set the cookie so the Server can read it later
  const cookieStore = await cookies();
  cookieStore.set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(session.expire),
  });
}
