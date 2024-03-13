import { adminAuth } from "@/firebase/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(request: NextRequest) {
  const sessionCookie = cookies().get("session")?.value || "";
  console.log(sessionCookie);

  if (!sessionCookie) {
    return new NextResponse(JSON.stringify({ isLogged: false }), {
      status: 401,
    });
  }

  try {
    // Use Firebase Admin to validate the session cookie
    await adminAuth.verifySessionCookie(sessionCookie, true);
    return new NextResponse(JSON.stringify({ isLogged: true }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ isLogged: false }), {
      status: 401,
    });
  }
}

export async function POST(request: NextRequest) {
  const authorization = headers().get("Authorization");

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);

      if (decodedToken) {
        //Generate session cookie

        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
          expiresIn,
        });

        const response = new NextResponse(null);
        response.cookies.set("session", sessionCookie, {
          maxAge: expiresIn / 1000,
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "strict",
        });
        return response;
      }
    } catch (error) {
      console.error("Failed to create session cookie: ", error);
      return new NextResponse(null, { status: 401 });
    }
  }

  return new NextResponse(null, { status: 401 });
}
