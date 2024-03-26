import { adminAuth } from "@/firebase/firebase-admin-config";
import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import generateHasuraJWT from "@/app/utils/generateHasuraJWT";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const authorization = headers().get("Authorization");
  console.log(authorization);

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      console.log(decodedToken);
      const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 days
      const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn,
      });
      console.log(sessionCookie);

      const hasuraJWT = generateHasuraJWT(decodedToken.uid);
      console.log(hasuraJWT);
      console.log("1, 2, 3, 4");
      const response = new NextResponse(
        JSON.stringify({ jwtToken: hasuraJWT }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Set session cookie in the response
      response.cookies.set("session", sessionCookie, {
        maxAge: expiresIn / 1000,
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });

      // Return the response with the Hasura JWT token
      console.log(response);
      return response;
    } catch (error) {
      console.error("Failed to create session cookie or Hasura JWT:", error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to create session cookie or Hasura JWT",
        }),
        { status: 401 }
      );
    }
  }

  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
  });
}
