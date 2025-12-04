import { createAdminClient, createSessionClient } from "@/app/lib/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function deleteCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("appwrite-session")
}

export async function POST(req: Request) {
  try {
    await deleteCookies();
    console.log((await cookies()).get('appwrite-session'));
    
    return NextResponse.json({
      message: "Logout and successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message, status: 400 },
      { status: 400 }
    ); // Also set the status code in the NextResponse
  }
}
