import { createAdminClient, createSessionClient } from "@/app/lib/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Models } from "node-appwrite";

async function setCookies(session: Models.Session) {
  const cookieStore = await cookies();

  cookieStore.set("appwrite-session", session.secret, {
    httpOnly: true,
    secure: true, //  set to true in production
    sameSite: "strict",
    expires: new Date(session.expire),
    path: "/",
  });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    console.log(email, password);
    setCookies(session);
    const  clientAccount = await createSessionClient();
    const user = await clientAccount?.account.get();
    console.log(user);

    return NextResponse.json({ user,  status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message, status: 400 },
      { status: 400 }
    ); // Also set the status code in the NextResponse
  }
}
