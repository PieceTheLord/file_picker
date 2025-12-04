import { createAdminClient, createSessionClient } from "@/app/lib/appwrite";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Models, ID } from "node-appwrite";

async function setCookies(session: Models.Session) {
  const cookieStore = await cookies();

  cookieStore.set("session", session.secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //  set to true in production
    sameSite: "strict",
    expires: new Date(session.expire),
    path: "/",
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { account } = await createAdminClient();

    const { email, password } = await req.json();

    const user = await account.create(ID.unique(), email, password);
    console.log(user);

    return NextResponse.json({ user, status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message, status: 400 },
      { status: 400 }
    ); // Also set the status code in the NextResponse
  }
}
