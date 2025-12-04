// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getLoggedInUser } from "./app/lib/appwrite";

export async function proxy(request: NextRequest) {
  const user = await getLoggedInUser();
  const { pathname } = request.nextUrl;
  console.log("Proxy.ts logs:", user);
  
  if (!user && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.url));
  } else if (
    user &&
    (request.nextUrl.pathname === "/auth" ||
      request.nextUrl.pathname === "/auth/login")
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
