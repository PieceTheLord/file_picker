// app/api/upload_file/route.ts
import { createAdminClient } from "@/app/lib/appwrite";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

const client = createAdminClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("files") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }
    const storage = (await client).storage;
    const upload = await storage.createFile(
      process.env.APPWRITE_STORAGE_BUCKET_ID!,
      ID.unique(),
      file
    );
    return NextResponse.json(
      { success: true, message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("General error during upload:", error);
    return NextResponse.json(
      { message: "General error during upload: " + error.message },
      { status: 500 }
    );
  }
}
