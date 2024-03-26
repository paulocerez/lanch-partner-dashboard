import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  //   return to login if there's no session cookie
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const responseAPI = await fetch(`${request.nextUrl.origin}/api/session`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.value}`,
    },
  });

  //   Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// protected routes being included here
export const config = {
  matcher: ["/", "/dashboard"],
};
