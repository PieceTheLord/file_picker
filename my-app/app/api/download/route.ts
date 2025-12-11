import { createAdminClient } from "@/app/lib/appwrite";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { storage } = await createAdminClient();

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) return new NextResponse("Missing file ID", { status: 400 });

    const file = await storage.getFile(
      process.env.APPWRITE_STORAGE_BUCKET_ID!,
      id
    );
    const fileDownload = await storage.getFileDownload(
      process.env.APPWRITE_STORAGE_BUCKET_ID!,
      id
    );
    const headers = new Headers();
    headers.set("Content-Type", file.mimeType);
    headers.set("Content-Disposition", `attachment; filename="${file.name}"`);

    return new NextResponse(fileDownload, { headers });
  } catch (err) {
    console.error("Error downloading file:", err);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
