// app/api/upload_file/route.ts
import {
  createAdminClient,
  getLoggedInUser,
  getTable
} from "@/app/lib/appwrite";
import { NextResponse } from "next/server";
import { Account, ID, TablesDB } from "node-appwrite";

export async function POST(req: Request) {
  // get 
  const { client, storage } = await createAdminClient();
  const user = await getLoggedInUser();

  try {
    const formData = await req.formData();
    const file = formData.get("files") as File | null;

    // Check if the file exist in the request
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }

    const upload = await storage.createFile({
      bucketId: process.env.APPWRITE_STORAGE_BUCKET_ID!,
      fileId: ID.unique(),
      file,
    });

    // Calculating date format
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3);

    const { table } = await getTable();
    await table.createRow({
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      tableId: process.env.APPWRITE_TABLE_ID!,
      rowId: "unique()",
      data: {
        email: user!.email,
        file_id: upload.$id,
        expiresAt: expiresAt.toISOString(),
        downloadsCount: 0,
        maxDownloads: 1,
      },
    });

    return NextResponse.json(
      { success: true, message: "File uploaded successfully", id: upload.$id },
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
